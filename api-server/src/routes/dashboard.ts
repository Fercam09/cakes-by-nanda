import { Router } from "express";
import { db } from "@workspace/db";
import { pedidosTable } from "@workspace/db";
import { eq, sql, and, gte, lte } from "drizzle-orm";

const router = Router();

// GET /dashboard/resumen - Summary statistics
router.get("/dashboard/resumen", async (req, res) => {
  try {
    // Count active orders (not delivered)
    const [activosResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(pedidosTable)
      .where(sql`${pedidosTable.estadoPedido} != 'entregado'`);

    // Count completed orders
    const [completadosResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(pedidosTable)
      .where(eq(pedidosTable.estadoPedido, "entregado"));

    // Total pending to collect (pending payment, not delivered)
    const [pendienteResult] = await db
      .select({ total: sql<number>`coalesce(sum(total_precio::numeric), 0)` })
      .from(pedidosTable)
      .where(eq(pedidosTable.estadoPago, "pendiente"));

    // Total sales (paid orders)
    const [ventasResult] = await db
      .select({ total: sql<number>`coalesce(sum(total_precio::numeric), 0)` })
      .from(pedidosTable)
      .where(eq(pedidosTable.estadoPago, "pagado"));

    // Today's deliveries
    const today = new Date().toISOString().split("T")[0];
    const [hoyResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(pedidosTable)
      .where(eq(pedidosTable.fechaEntrega, today));

    res.json({
      pedidosActivos: Number(activosResult?.count ?? 0),
      pedidosCompletados: Number(completadosResult?.count ?? 0),
      totalPendienteCobrar: Number(pendienteResult?.total ?? 0),
      totalVentas: Number(ventasResult?.total ?? 0),
      pedidosHoy: Number(hoyResult?.count ?? 0),
    });
  } catch (err) {
    req.log.error(err, "Error getting dashboard resumen");
    res.status(500).json({ error: "Error al obtener resumen" });
  }
});

// GET /dashboard/pedidos-hoy - Today's orders
router.get("/dashboard/pedidos-hoy", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const pedidos = await db
      .select()
      .from(pedidosTable)
      .where(eq(pedidosTable.fechaEntrega, today))
      .orderBy(pedidosTable.nombreCliente);

    const result = pedidos.map((p) => ({
      ...p,
      totalPrecio: Number(p.totalPrecio),
      createdAt: p.createdAt?.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    req.log.error(err, "Error getting pedidos hoy");
    res.status(500).json({ error: "Error al obtener pedidos de hoy" });
  }
});

// GET /dashboard/calendario - Orders grouped by delivery date
router.get("/dashboard/calendario", async (req, res) => {
  try {
    // Get all pending/active orders with delivery dates
    const pedidos = await db
      .select()
      .from(pedidosTable)
      .where(sql`${pedidosTable.estadoPedido} != 'entregado'`)
      .orderBy(pedidosTable.fechaEntrega);

    // Group by date
    const grouped: Record<string, typeof pedidos> = {};
    for (const p of pedidos) {
      const fecha = p.fechaEntrega;
      if (!grouped[fecha]) grouped[fecha] = [];
      grouped[fecha].push(p);
    }

    const result = Object.entries(grouped).map(([fecha, pedidosList]) => ({
      fecha,
      pedidos: pedidosList.map((p) => ({
        ...p,
        totalPrecio: Number(p.totalPrecio),
        createdAt: p.createdAt?.toISOString(),
      })),
    }));

    res.json(result);
  } catch (err) {
    req.log.error(err, "Error getting calendario");
    res.status(500).json({ error: "Error al obtener calendario" });
  }
});

export default router;
