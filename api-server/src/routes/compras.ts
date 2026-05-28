import { Router } from "express";
import { db } from "@workspace/db";
import { comprasTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/compras", async (req, res) => {
  try {
    const items = await db.select().from(comprasTable).orderBy(asc(comprasTable.comprado), asc(comprasTable.id));
    res.json(items.map((i) => ({ ...i, createdAt: i.createdAt?.toISOString() })));
  } catch (err) {
    req.log.error(err, "Error listing compras");
    res.status(500).json({ error: "Error al listar compras" });
  }
});

router.post("/compras", async (req, res) => {
  try {
    const { nombre, cantidad, comprado, notas } = req.body;
    const [item] = await db
      .insert(comprasTable)
      .values({ nombre, cantidad: cantidad ?? null, comprado: comprado ?? false, notas: notas ?? null })
      .returning();
    res.status(201).json({ ...item, createdAt: item.createdAt?.toISOString() });
  } catch (err) {
    req.log.error(err, "Error creating compra");
    res.status(500).json({ error: "Error al crear compra" });
  }
});

router.put("/compras/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, cantidad, comprado, notas } = req.body;
    const [item] = await db
      .update(comprasTable)
      .set({ nombre, cantidad: cantidad ?? null, comprado: comprado ?? false, notas: notas ?? null })
      .where(eq(comprasTable.id, id))
      .returning();
    if (!item) return res.status(404).json({ error: "Item no encontrado" });
    res.json({ ...item, createdAt: item.createdAt?.toISOString() });
  } catch (err) {
    req.log.error(err, "Error updating compra");
    res.status(500).json({ error: "Error al actualizar compra" });
  }
});

router.delete("/compras/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(comprasTable).where(eq(comprasTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error deleting compra");
    res.status(500).json({ error: "Error al eliminar compra" });
  }
});

export default router;
