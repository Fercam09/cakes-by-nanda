import { Router } from "express";
import {
  db,
  costeosTable,
  costeoIngredientesTable,
  ingredientesTable,
  insertCosteoSchema,
} from "@workspace/db";
import { eq, desc, inArray } from "drizzle-orm";

const router = Router();

interface LineaInput {
  ingredienteId: number;
  cantidadUsada: number;
}

async function fetchLineasConCosto(costeoId: number) {
  const rows = await db
    .select({
      id: costeoIngredientesTable.id,
      ingredienteId: ingredientesTable.id,
      ingredienteNombre: ingredientesTable.nombre,
      ingredienteUnidad: ingredientesTable.unidad,
      ingredienteCantidadCompra: ingredientesTable.cantidadCompra,
      ingredientePrecioCompra: ingredientesTable.precioCompra,
      cantidadUsada: costeoIngredientesTable.cantidadUsada,
    })
    .from(costeoIngredientesTable)
    .innerJoin(ingredientesTable, eq(costeoIngredientesTable.ingredienteId, ingredientesTable.id))
    .where(eq(costeoIngredientesTable.costeoId, costeoId))
    .orderBy(costeoIngredientesTable.id);

  return rows.map((r) => {
    const cantidadCompra = Number(r.ingredienteCantidadCompra) || 0;
    const precioCompra = Number(r.ingredientePrecioCompra) || 0;
    const cantidadUsada = Number(r.cantidadUsada) || 0;
    const costoUnitario = cantidadCompra > 0 ? precioCompra / cantidadCompra : 0;
    const costo = cantidadUsada * costoUnitario;
    return {
      id: r.id,
      ingredienteId: r.ingredienteId,
      ingredienteNombre: r.ingredienteNombre,
      ingredienteUnidad: r.ingredienteUnidad,
      cantidadUsada,
      costoUnitario,
      costo,
    };
  });
}

async function serializeCosteo(c: typeof costeosTable.$inferSelect) {
  const lineas = await fetchLineasConCosto(c.id);
  return {
    ...c,
    costoIngredientes: Number(c.costoIngredientes),
    costoEmpaque: Number(c.costoEmpaque),
    otrosCostos: Number(c.otrosCostos),
    margenGanancia: Number(c.margenGanancia),
    createdAt: c.createdAt?.toISOString(),
    lineas,
  };
}

function parseLineas(body: any): LineaInput[] {
  if (!Array.isArray(body.lineas)) return [];
  return body.lineas
    .map((l: any) => ({
      ingredienteId: Number(l.ingredienteId),
      cantidadUsada: Number(l.cantidadUsada) || 0,
    }))
    .filter((l: LineaInput) => Number.isFinite(l.ingredienteId) && l.ingredienteId > 0 && l.cantidadUsada > 0);
}

class IngredientesNoEncontradosError extends Error {
  faltantes: number[];
  constructor(faltantes: number[]) {
    super("Ingredientes no encontrados: " + faltantes.join(", "));
    this.faltantes = faltantes;
  }
}

async function loadAndComputeTotal(lineas: LineaInput[]): Promise<number> {
  if (lineas.length === 0) return 0;
  const ids = Array.from(new Set(lineas.map((l) => l.ingredienteId)));
  const ingredientes = await db
    .select()
    .from(ingredientesTable)
    .where(inArray(ingredientesTable.id, ids));
  const byId = new Map(ingredientes.map((i) => [i.id, i]));
  const faltantes = ids.filter((id) => !byId.has(id));
  if (faltantes.length > 0) throw new IngredientesNoEncontradosError(faltantes);
  let total = 0;
  for (const l of lineas) {
    const ing = byId.get(l.ingredienteId)!;
    const cantidadCompra = Number(ing.cantidadCompra) || 0;
    const precioCompra = Number(ing.precioCompra) || 0;
    const costoUnitario = cantidadCompra > 0 ? precioCompra / cantidadCompra : 0;
    total += l.cantidadUsada * costoUnitario;
  }
  return total;
}

function normalizeBody(body: any, costoIngredientesCalculado: number, hasLineas: boolean) {
  return {
    nombre: body.nombre,
    costoIngredientes: hasLineas
      ? costoIngredientesCalculado.toFixed(2)
      : String(body.costoIngredientes ?? 0),
    costoEmpaque: String(body.costoEmpaque ?? 0),
    otrosCostos: String(body.otrosCostos ?? 0),
    cantidad: Number(body.cantidad ?? 1),
    margenGanancia: String(body.margenGanancia ?? 50),
  };
}

router.get("/costeos", async (req, res) => {
  try {
    const rows = await db.select().from(costeosTable).orderBy(desc(costeosTable.createdAt));
    const serialized = await Promise.all(rows.map(serializeCosteo));
    return res.json(serialized);
  } catch (err) {
    req.log.error(err, "Error listing costeos");
    return res.status(500).json({ error: "Error al listar costeos" });
  }
});

router.post("/costeos", async (req, res) => {
  try {
    const lineas = parseLineas(req.body);
    const total = await loadAndComputeTotal(lineas);
    const body = insertCosteoSchema.parse(normalizeBody(req.body, total, lineas.length > 0));

    const created = await db.transaction(async (tx) => {
      const [row] = await tx.insert(costeosTable).values(body).returning();
      if (lineas.length > 0) {
        await tx.insert(costeoIngredientesTable).values(
          lineas.map((l) => ({
            costeoId: row.id,
            ingredienteId: l.ingredienteId,
            cantidadUsada: String(l.cantidadUsada),
          })),
        );
      }
      return row;
    });
    return res.status(201).json(await serializeCosteo(created));
  } catch (err) {
    if (err instanceof IngredientesNoEncontradosError) {
      return res.status(400).json({ error: err.message });
    }
    req.log.error(err, "Error creating costeo");
    return res.status(400).json({ error: "Datos inválidos" });
  }
});

router.put("/costeos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const lineas = parseLineas(req.body);
    const total = await loadAndComputeTotal(lineas);
    const body = insertCosteoSchema.parse(normalizeBody(req.body, total, lineas.length > 0));

    const updated = await db.transaction(async (tx) => {
      const [row] = await tx
        .update(costeosTable)
        .set(body)
        .where(eq(costeosTable.id, id))
        .returning();
      if (!row) return null;
      await tx.delete(costeoIngredientesTable).where(eq(costeoIngredientesTable.costeoId, id));
      if (lineas.length > 0) {
        await tx.insert(costeoIngredientesTable).values(
          lineas.map((l) => ({
            costeoId: id,
            ingredienteId: l.ingredienteId,
            cantidadUsada: String(l.cantidadUsada),
          })),
        );
      }
      return row;
    });
    if (!updated) return res.status(404).json({ error: "Costeo no encontrado" });
    return res.json(await serializeCosteo(updated));
  } catch (err) {
    if (err instanceof IngredientesNoEncontradosError) {
      return res.status(400).json({ error: err.message });
    }
    req.log.error(err, "Error updating costeo");
    return res.status(400).json({ error: "Datos inválidos" });
  }
});

router.delete("/costeos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(costeosTable).where(eq(costeosTable.id, id));
    return res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error deleting costeo");
    return res.status(500).json({ error: "Error al borrar costeo" });
  }
});

export default router;
