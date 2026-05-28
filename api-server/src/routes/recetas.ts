import { Router } from "express";
import { db } from "@workspace/db";
import { recetasTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// GET /recetas - List all recipes
router.get("/recetas", async (req, res) => {
  try {
    const recetas = await db.select().from(recetasTable).orderBy(recetasTable.nombre);

    const result = recetas.map((r) => ({
      ...r,
      costoEstimado: r.costoEstimado == null ? null : Number(r.costoEstimado),
      createdAt: r.createdAt?.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    req.log.error(err, "Error listing recetas");
    res.status(500).json({ error: "Error al listar recetas" });
  }
});

const toNullableInt = (v: unknown): number | null => {
  if (v == null || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
};

const toNullableDecimalString = (v: unknown): string | null => {
  if (v == null || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? String(n) : null;
};

// POST /recetas - Create a recipe
router.post("/recetas", async (req, res) => {
  try {
    const { nombre, ingredientes, pasos, rendimiento, costoEstimado, tiempoHorno, notas } = req.body;

    const [receta] = await db
      .insert(recetasTable)
      .values({
        nombre,
        ingredientes,
        pasos: pasos ?? null,
        rendimiento: toNullableInt(rendimiento),
        costoEstimado: toNullableDecimalString(costoEstimado),
        tiempoHorno: tiempoHorno ?? null,
        notas: notas ?? null,
      })
      .returning();

    res.status(201).json({
      ...receta,
      costoEstimado: receta.costoEstimado == null ? null : Number(receta.costoEstimado),
      createdAt: receta.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error creating receta");
    res.status(500).json({ error: "Error al crear receta" });
  }
});

// GET /recetas/:id - Get a recipe by ID
router.get("/recetas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [receta] = await db.select().from(recetasTable).where(eq(recetasTable.id, id));

    if (!receta) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    res.json({
      ...receta,
      costoEstimado: receta.costoEstimado == null ? null : Number(receta.costoEstimado),
      createdAt: receta.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error getting receta");
    res.status(500).json({ error: "Error al obtener receta" });
  }
});

// PUT /recetas/:id - Update a recipe
router.put("/recetas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, ingredientes, pasos, rendimiento, costoEstimado, tiempoHorno, notas } = req.body;

    const [receta] = await db
      .update(recetasTable)
      .set({
        nombre,
        ingredientes,
        pasos: pasos ?? null,
        rendimiento: toNullableInt(rendimiento),
        costoEstimado: toNullableDecimalString(costoEstimado),
        tiempoHorno: tiempoHorno ?? null,
        notas: notas ?? null,
      })
      .where(eq(recetasTable.id, id))
      .returning();

    if (!receta) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    res.json({
      ...receta,
      costoEstimado: receta.costoEstimado == null ? null : Number(receta.costoEstimado),
      createdAt: receta.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error updating receta");
    res.status(500).json({ error: "Error al actualizar receta" });
  }
});

// DELETE /recetas/:id - Delete a recipe
router.delete("/recetas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(recetasTable).where(eq(recetasTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error deleting receta");
    res.status(500).json({ error: "Error al eliminar receta" });
  }
});

export default router;
