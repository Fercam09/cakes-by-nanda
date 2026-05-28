import { Router } from "express";
import { db, gastosTable, insertGastoSchema, pedidosTable } from "@workspace/db";
import { eq, sql, desc, and, gte, lte } from "drizzle-orm";

const router = Router();

function monthRange(mes?: string) {
  const now = new Date();
  const target = mes ?? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const [y, m] = target.split("-").map(Number);
  const start = `${target}-01`;
  const lastDay = new Date(y, m, 0).getDate();
  const end = `${target}-${String(lastDay).padStart(2, "0")}`;
  return { mes: target, start, end };
}

router.get("/gastos", async (req, res) => {
  try {
    const mes = typeof req.query.mes === "string" ? req.query.mes : undefined;
    const where = mes
      ? and(gte(gastosTable.fecha, monthRange(mes).start), lte(gastosTable.fecha, monthRange(mes).end))
      : undefined;
    const rows = await db.select().from(gastosTable).where(where as any).orderBy(desc(gastosTable.fecha), desc(gastosTable.id));
    res.json(rows.map((g) => ({ ...g, monto: Number(g.monto), createdAt: g.createdAt?.toISOString() })));
  } catch (err) {
    req.log.error(err, "Error listing gastos");
    res.status(500).json({ error: "Error al listar gastos" });
  }
});

router.post("/gastos", async (req, res) => {
  try {
    const body = insertGastoSchema.parse({ ...req.body, monto: String(req.body.monto) });
    const [created] = await db.insert(gastosTable).values(body).returning();
    res.status(201).json({ ...created, monto: Number(created.monto), createdAt: created.createdAt?.toISOString() });
  } catch (err) {
    req.log.error(err, "Error creating gasto");
    res.status(400).json({ error: "Datos inválidos" });
  }
});

router.delete("/gastos/:id", async (req, res) => {
  try {
    await db.delete(gastosTable).where(eq(gastosTable.id, Number(req.params.id)));
    res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error deleting gasto");
    res.status(500).json({ error: "Error al borrar gasto" });
  }
});

router.get("/gastos/resumen", async (req, res) => {
  try {
    const { mes, start, end } = monthRange(typeof req.query.mes === "string" ? req.query.mes : undefined);

    const [ventasRow] = await db
      .select({ total: sql<number>`coalesce(sum(total_precio::numeric), 0)` })
      .from(pedidosTable)
      .where(
        and(
          eq(pedidosTable.estadoPago, "pagado"),
          gte(pedidosTable.fechaEntrega, start),
          lte(pedidosTable.fechaEntrega, end),
        ),
      );

    const [gastosRow] = await db
      .select({ total: sql<number>`coalesce(sum(monto::numeric), 0)` })
      .from(gastosTable)
      .where(and(gte(gastosTable.fecha, start), lte(gastosTable.fecha, end)));

    const porCategoria = await db
      .select({
        categoria: gastosTable.categoria,
        total: sql<number>`coalesce(sum(monto::numeric), 0)`,
      })
      .from(gastosTable)
      .where(and(gte(gastosTable.fecha, start), lte(gastosTable.fecha, end)))
      .groupBy(gastosTable.categoria);

    const ventas = Number(ventasRow?.total ?? 0);
    const gastos = Number(gastosRow?.total ?? 0);

    res.json({
      mes,
      ventas,
      gastos,
      ganancia: ventas - gastos,
      gastosPorCategoria: porCategoria.map((c) => ({ categoria: c.categoria, total: Number(c.total) })),
    });
  } catch (err) {
    req.log.error(err, "Error getting gastos resumen");
    res.status(500).json({ error: "Error al obtener resumen" });
  }
});

export default router;
