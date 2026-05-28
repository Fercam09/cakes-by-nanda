import { Router } from "express";
import { db, ingredientesTable, costeoIngredientesTable, insertIngredienteSchema } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

function serialize(i: typeof ingredientesTable.$inferSelect) {
  const cantidad = Number(i.cantidadCompra);
  return {
    ...i,
    cantidadCompra: cantidad,
    precioCompra: Number(i.precioCompra),
    costoUnitario: Number(i.precioCompra) / Math.max(cantidad, 0.000001),
    stockActual: Number(i.stockActual ?? 0),
    stockMinimo: i.stockMinimo == null ? null : Number(i.stockMinimo),
    createdAt: i.createdAt?.toISOString(),
  };
}

function normalizeBody(body: any) {
  return {
    nombre: String(body.nombre ?? "").trim(),
    marca: body.marca ? String(body.marca).trim() : null,
    unidad: String(body.unidad ?? "g").trim(),
    cantidadCompra: String(body.cantidadCompra ?? 0),
    precioCompra: String(body.precioCompra ?? 0),
    stockActual: body.stockActual != null ? String(body.stockActual) : "0",
    stockMinimo: body.stockMinimo != null && body.stockMinimo !== "" ? String(body.stockMinimo) : null,
    notas: body.notas ? String(body.notas) : null,
  };
}

router.get("/ingredientes", async (req, res) => {
  try {
    const rows = await db.select().from(ingredientesTable).orderBy(ingredientesTable.nombre);
    return res.json(rows.map(serialize));
  } catch (err) {
    req.log.error(err, "Error listing ingredientes");
    return res.status(500).json({ error: "Error al listar ingredientes" });
  }
});

router.post("/ingredientes", async (req, res) => {
  try {
    const body = insertIngredienteSchema.parse(normalizeBody(req.body));
    if (!body.nombre) return res.status(400).json({ error: "Nombre requerido" });
    const [created] = await db.insert(ingredientesTable).values(body).returning();
    return res.status(201).json(serialize(created));
  } catch (err) {
    req.log.error(err, "Error creating ingrediente");
    return res.status(400).json({ error: "Datos inválidos" });
  }
});

router.put("/ingredientes/:id", async (req, res) => {
  try {
    const body = insertIngredienteSchema.parse(normalizeBody(req.body));
    const [updated] = await db
      .update(ingredientesTable)
      .set(body)
      .where(eq(ingredientesTable.id, Number(req.params.id)))
      .returning();
    if (!updated) return res.status(404).json({ error: "Ingrediente no encontrado" });
    return res.json(serialize(updated));
  } catch (err) {
    req.log.error(err, "Error updating ingrediente");
    return res.status(400).json({ error: "Datos inválidos" });
  }
});

router.patch("/ingredientes/:id/stock", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const delta = Number(req.body?.delta);
    if (!Number.isFinite(delta) || delta === 0) {
      return res.status(400).json({ error: "delta inválido" });
    }
    const [current] = await db.select().from(ingredientesTable).where(eq(ingredientesTable.id, id)).limit(1);
    if (!current) return res.status(404).json({ error: "Ingrediente no encontrado" });
    const next = Math.max(0, Number(current.stockActual ?? 0) + delta);
    const [updated] = await db
      .update(ingredientesTable)
      .set({ stockActual: String(next) })
      .where(eq(ingredientesTable.id, id))
      .returning();
    return res.json(serialize(updated));
  } catch (err) {
    req.log.error(err, "Error adjusting stock");
    return res.status(400).json({ error: "Error al ajustar stock" });
  }
});

router.delete("/ingredientes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(costeoIngredientesTable)
      .where(eq(costeoIngredientesTable.ingredienteId, id));
    if (count > 0) {
      return res.status(409).json({ error: `Este ingrediente está en uso en ${count} costeo(s). Quítalo primero.` });
    }
    await db.delete(ingredientesTable).where(eq(ingredientesTable.id, id));
    return res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error deleting ingrediente");
    return res.status(500).json({ error: "Error al borrar ingrediente" });
  }
});

export default router;
