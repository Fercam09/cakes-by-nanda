import { Router } from "express";
import { db, pedidosTable, productosTable, configuracionTable, produccionTable, fechasBloqueadasTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { randomBytes } from "node:crypto";

const router = Router();

function generateSlug() {
  return randomBytes(6).toString("hex");
}

async function ensureConfig() {
  const rows = await db.select().from(configuracionTable).limit(1);
  if (rows.length > 0) return rows[0];
  const [created] = await db.insert(configuracionTable).values({}).returning();
  return created;
}

router.get("/publico/menu", async (req, res) => {
  try {
    const productos = await db
      .select()
      .from(productosTable)
      .where(eq(productosTable.disponible, true))
      .orderBy(asc(productosTable.nombre));
    const config = await ensureConfig();
    const fechasBloqueadas = await db
      .select({ fecha: fechasBloqueadasTable.fecha })
      .from(fechasBloqueadasTable)
      .orderBy(asc(fechasBloqueadasTable.fecha));
    res.json({
      productos: productos.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: Number(p.precio),
        disponible: p.disponible,
        imagen: p.imagen,
      })),
      configuracion: {
        numeroSinpe: config.numeroSinpe,
        nombreSinpe: config.nombreSinpe,
        instruccionesSinpe: config.instruccionesSinpe,
        mensajeBienvenida: config.mensajeBienvenida,
      },
      nombreNegocio: "Cakes by Nanda",
      fechasBloqueadas: fechasBloqueadas.map((f) => f.fecha),
    });
  } catch (err) {
    req.log.error(err, "Error getting menu publico");
    res.status(500).json({ error: "Error" });
  }
});

router.post("/publico/pedidos", async (req, res) => {
  try {
    const { nombreCliente, telefono, fechaEntrega, items, notas, metodoPago } = req.body;
    if (!nombreCliente?.trim() || !telefono?.trim() || !fechaEntrega || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    if (String(nombreCliente).length > 200 || String(telefono).length > 50) {
      return res.status(400).json({ error: "Nombre o teléfono muy largos" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(fechaEntrega))) {
      return res.status(400).json({ error: "Fecha inválida" });
    }
    const today = new Date().toISOString().slice(0, 10);
    if (String(fechaEntrega) < today) {
      return res.status(400).json({ error: "La fecha de entrega no puede ser pasada" });
    }
    // Reject blocked dates
    const blocked = await db
      .select()
      .from(fechasBloqueadasTable)
      .where(eq(fechasBloqueadasTable.fecha, String(fechaEntrega)))
      .limit(1);
    if (blocked.length > 0) {
      return res.status(400).json({ error: "Esa fecha no está disponible para entregas. Elige otro día." });
    }

    const metodoPagoFinal = metodoPago === "efectivo" ? "efectivo" : "sinpe";

    // Compute totals server-side from product catalog
    const lineas: Array<{ id: number; nombre: string; cantidad: number; precioUnitario: number }> = [];
    let totalPrecio = 0;
    for (const it of items) {
      const productoId = Number(it.productoId);
      const cantidad = Number(it.cantidad);
      if (!Number.isInteger(productoId) || !Number.isInteger(cantidad) || cantidad <= 0 || cantidad > 999) {
        return res.status(400).json({ error: "Items inválidos" });
      }
      const [prod] = await db
        .select()
        .from(productosTable)
        .where(eq(productosTable.id, productoId))
        .limit(1);
      if (!prod || !prod.disponible) {
        return res.status(400).json({ error: `Producto no disponible` });
      }
      const precioUnitario = Number(prod.precio);
      totalPrecio += precioUnitario * cantidad;
      lineas.push({ id: prod.id, nombre: prod.nombre, cantidad, precioUnitario });
    }

    let slug = generateSlug();
    for (let i = 0; i < 3; i++) {
      const existing = await db.select().from(pedidosTable).where(eq(pedidosTable.slug, slug)).limit(1);
      if (existing.length === 0) break;
      slug = generateSlug();
    }

    const [created] = await db
      .insert(pedidosTable)
      .values({
        nombreCliente: String(nombreCliente).trim().slice(0, 200),
        telefono: String(telefono).trim().slice(0, 50),
        fechaPedido: today,
        fechaEntrega: String(fechaEntrega),
        productos: JSON.stringify(lineas),
        totalPrecio: String(totalPrecio),
        estadoPedido: "pendiente_aprobacion",
        estadoPago: "pendiente",
        metodoPago: metodoPagoFinal,
        notas: notas ? String(notas).slice(0, 1000) : null,
        slug,
        origenCliente: "web",
      })
      .returning();
    res.status(201).json({ slug: created.slug!, id: created.id });
  } catch (err) {
    req.log.error(err, "Error creating pedido publico");
    res.status(500).json({ error: "No pudimos crear el pedido" });
  }
});

router.get("/publico/pedidos/:slug", async (req, res) => {
  try {
    const [pedido] = await db
      .select()
      .from(pedidosTable)
      .where(eq(pedidosTable.slug, req.params.slug))
      .limit(1);
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });

    const config = await ensureConfig();

    let produccionData = null;
    const [prod] = await db
      .select()
      .from(produccionTable)
      .where(eq(produccionTable.pedidoId, pedido.id))
      .limit(1);
    if (prod) {
      produccionData = {
        masaLista: Boolean(prod.masaLista),
        horneado: Boolean(prod.horneado),
        decorado: Boolean(prod.decorado),
        empacado: Boolean(prod.empacado),
        entregado: pedido.estadoPedido === "entregado",
      };
    }

    res.json({
      slug: pedido.slug,
      nombreCliente: pedido.nombreCliente,
      telefono: pedido.telefono,
      fechaPedido: pedido.fechaPedido,
      fechaEntrega: pedido.fechaEntrega,
      productos: pedido.productos,
      totalPrecio: Number(pedido.totalPrecio),
      estadoPago: pedido.estadoPago,
      estadoPedido: pedido.estadoPedido,
      metodoPago: pedido.metodoPago,
      notas: pedido.notas,
      referenciaSinpe: pedido.referenciaSinpe,
      configuracion: {
        numeroSinpe: config.numeroSinpe,
        nombreSinpe: config.nombreSinpe,
        instruccionesSinpe: config.instruccionesSinpe,
        mensajeBienvenida: config.mensajeBienvenida,
      },
      produccion: produccionData,
    });
  } catch (err) {
    req.log.error(err, "Error getting pedido publico");
    res.status(500).json({ error: "Error" });
  }
});

router.post("/publico/pedidos/:slug/comprobante", async (req, res) => {
  try {
    const { referenciaSinpe } = req.body;
    if (!referenciaSinpe?.trim()) {
      return res.status(400).json({ error: "Falta la referencia" });
    }
    const [updated] = await db
      .update(pedidosTable)
      .set({ referenciaSinpe: String(referenciaSinpe).trim() })
      .where(eq(pedidosTable.slug, req.params.slug))
      .returning();
    if (!updated) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "Error setting comprobante");
    res.status(500).json({ error: "Error" });
  }
});

export default router;
