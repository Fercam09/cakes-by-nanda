import { Router } from "express";
import { db } from "@workspace/db";
import { produccionTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// GET /produccion - List all production checklists
router.get("/produccion", async (req, res) => {
  try {
    const checklists = await db.select().from(produccionTable).orderBy(produccionTable.pedidoId);

    const result = checklists.map((c) => ({
      ...c,
      createdAt: c.createdAt?.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    req.log.error(err, "Error listing produccion");
    res.status(500).json({ error: "Error al listar produccion" });
  }
});

// POST /produccion - Create a production checklist
router.post("/produccion", async (req, res) => {
  try {
    const { pedidoId, ingredientesListos, masaLista, horneado, enfriado, decorado, empacado, listoParaEntregar, notas } = req.body;

    const [checklist] = await db
      .insert(produccionTable)
      .values({
        pedidoId: Number(pedidoId),
        ingredientesListos: ingredientesListos ?? false,
        masaLista: masaLista ?? false,
        horneado: horneado ?? false,
        enfriado: enfriado ?? false,
        decorado: decorado ?? false,
        empacado: empacado ?? false,
        listoParaEntregar: listoParaEntregar ?? false,
        notas,
      })
      .returning();

    res.status(201).json({
      ...checklist,
      createdAt: checklist.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error creating produccion");
    res.status(500).json({ error: "Error al crear produccion" });
  }
});

// PUT /produccion/:id - Update a production checklist
router.put("/produccion/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { pedidoId, ingredientesListos, masaLista, horneado, enfriado, decorado, empacado, listoParaEntregar, notas } = req.body;

    const [checklist] = await db
      .update(produccionTable)
      .set({
        pedidoId: Number(pedidoId),
        ingredientesListos: ingredientesListos ?? false,
        masaLista,
        horneado,
        enfriado,
        decorado,
        empacado,
        listoParaEntregar,
        notas,
      })
      .where(eq(produccionTable.id, id))
      .returning();

    if (!checklist) {
      return res.status(404).json({ error: "Checklist no encontrado" });
    }

    res.json({
      ...checklist,
      createdAt: checklist.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error updating produccion");
    res.status(500).json({ error: "Error al actualizar produccion" });
  }
});

export default router;
