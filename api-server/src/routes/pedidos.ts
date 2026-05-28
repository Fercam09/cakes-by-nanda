import { Router } from "express";
import { db } from "@workspace/db";
import { pedidosTable, produccionTable } from "@workspace/db";
import { eq, ilike, and, sql } from "drizzle-orm";

const router = Router();

// GET /pedidos - List all orders with optional filters
router.get("/pedidos", async (req, res) => {
  try {
    const { estado, pago, busqueda } = req.query;

    const conditions = [];
    if (estado) conditions.push(eq(pedidosTable.estadoPedido, estado as typeof pedidosTable.estadoPedido._.data));
    if (pago) conditions.push(eq(pedidosTable.estadoPago, pago as typeof pedidosTable.estadoPago._.data));
    if (busqueda) conditions.push(ilike(pedidosTable.nombreCliente, `%${busqueda}%`));

    const pedidos = await db
      .select()
      .from(pedidosTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(pedidosTable.fechaEntrega);

    // Parse JSON productos field for response
    const result = pedidos.map((p) => ({
      ...p,
      totalPrecio: Number(p.totalPrecio),
      createdAt: p.createdAt?.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    req.log.error(err, "Error listing pedidos");
    res.status(500).json({ error: "Error al listar pedidos" });
  }
});

// POST /pedidos - Create a new order
router.post("/pedidos", async (req, res) => {
  try {
    const {
      nombreCliente,
      telefono,
      fechaPedido,
      fechaEntrega,
      productos,
      totalPrecio,
      estadoPago,
      estadoPedido,
      notas,
      metodoPago,
    } = req.body;

    const [pedido] = await db
      .insert(pedidosTable)
      .values({
        nombreCliente,
        telefono,
        fechaPedido,
        fechaEntrega,
        productos,
        totalPrecio: String(totalPrecio),
        estadoPago: estadoPago ?? "pendiente",
        estadoPedido: estadoPedido ?? "pendiente",
        notas,
        metodoPago: metodoPago === "efectivo" ? "efectivo" : "sinpe",
      })
      .returning();

    res.status(201).json({
      ...pedido,
      totalPrecio: Number(pedido.totalPrecio),
      createdAt: pedido.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error creating pedido");
    res.status(500).json({ error: "Error al crear pedido" });
  }
});

// GET /pedidos/:id - Get a single order
router.get("/pedidos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [pedido] = await db.select().from(pedidosTable).where(eq(pedidosTable.id, id));

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({
      ...pedido,
      totalPrecio: Number(pedido.totalPrecio),
      createdAt: pedido.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error getting pedido");
    res.status(500).json({ error: "Error al obtener pedido" });
  }
});

// PUT /pedidos/:id - Update an order
router.put("/pedidos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      nombreCliente,
      telefono,
      fechaPedido,
      fechaEntrega,
      productos,
      totalPrecio,
      estadoPago,
      estadoPedido,
      notas,
      metodoPago,
    } = req.body;

    const updateValues: Record<string, unknown> = {
      nombreCliente,
      telefono,
      fechaPedido,
      fechaEntrega,
      productos,
      totalPrecio: String(totalPrecio),
      estadoPago,
      estadoPedido,
      notas,
    };
    if (metodoPago === "sinpe" || metodoPago === "efectivo") {
      updateValues.metodoPago = metodoPago;
    }

    const [pedido] = await db
      .update(pedidosTable)
      .set(updateValues)
      .where(eq(pedidosTable.id, id))
      .returning();

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({
      ...pedido,
      totalPrecio: Number(pedido.totalPrecio),
      createdAt: pedido.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error updating pedido");
    res.status(500).json({ error: "Error al actualizar pedido" });
  }
});

// DELETE /pedidos/:id - Delete an order
router.delete("/pedidos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(pedidosTable).where(eq(pedidosTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error deleting pedido");
    res.status(500).json({ error: "Error al eliminar pedido" });
  }
});

// PATCH /pedidos/:id/estado - Update order status
router.patch("/pedidos/:id/estado", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { estadoPedido, estadoPago } = req.body;

    const updateData: Record<string, unknown> = {};
    if (estadoPedido !== undefined) updateData.estadoPedido = estadoPedido;
    if (estadoPago !== undefined) updateData.estadoPago = estadoPago;

    const [pedido] = await db
      .update(pedidosTable)
      .set(updateData)
      .where(eq(pedidosTable.id, id))
      .returning();

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({
      ...pedido,
      totalPrecio: Number(pedido.totalPrecio),
      createdAt: pedido.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error updating pedido estado");
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

// POST /pedidos/:id/aprobar - Approve a pending order and start production tracking
router.post("/pedidos/:id/aprobar", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const [pedido] = await db
      .update(pedidosTable)
      .set({ estadoPedido: "pendiente" })
      .where(eq(pedidosTable.id, id))
      .returning();

    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });

    const existing = await db
      .select()
      .from(produccionTable)
      .where(eq(produccionTable.pedidoId, id))
      .limit(1);
    if (existing.length === 0) {
      await db.insert(produccionTable).values({ pedidoId: id });
    }

    res.json({
      ...pedido,
      totalPrecio: Number(pedido.totalPrecio),
      createdAt: pedido.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error approving pedido");
    res.status(500).json({ error: "Error al aprobar pedido" });
  }
});

// POST /pedidos/:id/rechazar - Reject a pending order
router.post("/pedidos/:id/rechazar", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const [pedido] = await db
      .update(pedidosTable)
      .set({ estadoPedido: "rechazado" })
      .where(eq(pedidosTable.id, id))
      .returning();

    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });

    res.json({
      ...pedido,
      totalPrecio: Number(pedido.totalPrecio),
      createdAt: pedido.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error rejecting pedido");
    res.status(500).json({ error: "Error al rechazar pedido" });
  }
});

export default router;
