import { Router } from "express";
import { db, fechasBloqueadasTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;

function serialize(f: typeof fechasBloqueadasTable.$inferSelect) {
  return {
    id: f.id,
    fecha: f.fecha,
    motivo: f.motivo,
  };
}

router.get("/fechas-bloqueadas", async (req, res) => {
  try {
    const rows = await db.select().from(fechasBloqueadasTable).orderBy(asc(fechasBloqueadasTable.fecha));
    return res.json(rows.map(serialize));
  } catch (err) {
    req.log.error(err, "Error listing fechas bloqueadas");
    return res.status(500).json({ error: "Error al listar fechas" });
  }
});

router.post("/fechas-bloqueadas", async (req, res) => {
  try {
    const fecha = String(req.body?.fecha ?? "");
    const motivo = req.body?.motivo ? String(req.body.motivo).slice(0, 200) : null;
    if (!FECHA_RE.test(fecha)) {
      return res.status(400).json({ error: "Fecha inválida (formato YYYY-MM-DD)" });
    }
    const existing = await db.select().from(fechasBloqueadasTable).where(eq(fechasBloqueadasTable.fecha, fecha)).limit(1);
    if (existing.length > 0) {
      return res.status(200).json(serialize(existing[0]));
    }
    const [created] = await db.insert(fechasBloqueadasTable).values({ fecha, motivo }).returning();
    return res.status(201).json(serialize(created));
  } catch (err) {
    req.log.error(err, "Error blocking fecha");
    return res.status(400).json({ error: "No se pudo bloquear la fecha" });
  }
});

router.delete("/fechas-bloqueadas/:fecha", async (req, res) => {
  try {
    const fecha = String(req.params.fecha);
    if (!FECHA_RE.test(fecha)) {
      return res.status(400).json({ error: "Fecha inválida" });
    }
    await db.delete(fechasBloqueadasTable).where(eq(fechasBloqueadasTable.fecha, fecha));
    return res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error unblocking fecha");
    return res.status(500).json({ error: "Error al desbloquear" });
  }
});

export default router;
