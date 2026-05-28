import { Router } from "express";
import { db, configuracionTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

async function ensureRow() {
  const rows = await db.select().from(configuracionTable).limit(1);
  if (rows.length > 0) return rows[0];
  const [created] = await db.insert(configuracionTable).values({}).returning();
  return created;
}

function serialize(c: typeof configuracionTable.$inferSelect) {
  return {
    numeroSinpe: c.numeroSinpe,
    nombreSinpe: c.nombreSinpe,
    instruccionesSinpe: c.instruccionesSinpe,
    mensajeBienvenida: c.mensajeBienvenida,
    pasosCompletados: c.pasosCompletados ?? {},
  };
}

router.get("/configuracion", async (req, res) => {
  try {
    const row = await ensureRow();
    res.json(serialize(row));
  } catch (err) {
    req.log.error(err, "Error getting configuracion");
    res.status(500).json({ error: "Error" });
  }
});

router.put("/configuracion", async (req, res) => {
  try {
    const row = await ensureRow();
    const [updated] = await db
      .update(configuracionTable)
      .set({
        numeroSinpe: req.body.numeroSinpe ?? null,
        nombreSinpe: req.body.nombreSinpe ?? null,
        instruccionesSinpe: req.body.instruccionesSinpe ?? null,
        mensajeBienvenida: req.body.mensajeBienvenida ?? null,
        updatedAt: new Date(),
      })
      .where(eq(configuracionTable.id, row.id))
      .returning();
    res.json(serialize(updated));
  } catch (err) {
    req.log.error(err, "Error updating configuracion");
    res.status(500).json({ error: "Error" });
  }
});

router.put("/configuracion/pasos", async (req, res) => {
  try {
    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ error: "Cuerpo inválido" });
    }
    const sanitized: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(body)) {
      if (typeof k === "string" && typeof v === "boolean") sanitized[k] = v;
    }
    const row = await ensureRow();
    const [updated] = await db
      .update(configuracionTable)
      .set({ pasosCompletados: sanitized, updatedAt: new Date() })
      .where(eq(configuracionTable.id, row.id))
      .returning();
    res.json(updated.pasosCompletados ?? {});
  } catch (err) {
    req.log.error(err, "Error updating pasos");
    res.status(500).json({ error: "Error" });
  }
});

export default router;
