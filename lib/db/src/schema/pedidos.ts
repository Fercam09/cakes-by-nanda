import { pgTable, serial, text, numeric, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const pedidosTable = pgTable("pedidos", {
  id: serial("id").primaryKey(),
  nombreCliente: text("nombre_cliente").notNull(),
  telefono: text("telefono").notNull(),
  fechaPedido: date("fecha_pedido").notNull(),
  fechaEntrega: date("fecha_entrega").notNull(),
  productos: text("productos").notNull(),
  totalPrecio: numeric("total_precio", { precision: 10, scale: 2 }).notNull(),
  estadoPago: text("estado_pago", { enum: ["pendiente", "pagado"] }).notNull().default("pendiente"),
  estadoPedido: text("estado_pedido", { enum: ["pendiente_aprobacion", "pendiente", "en_progreso", "horneado", "empacado", "entregado", "rechazado"] }).notNull().default("pendiente"),
  metodoPago: text("metodo_pago", { enum: ["sinpe", "efectivo"] }).notNull().default("sinpe"),
  notas: text("notas"),
  slug: text("slug").unique(),
  referenciaSinpe: text("referencia_sinpe"),
  origenCliente: text("origen_cliente"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPedidoSchema = createInsertSchema(pedidosTable).omit({ id: true, createdAt: true });
export type InsertPedido = z.infer<typeof insertPedidoSchema>;
export type Pedido = typeof pedidosTable.$inferSelect;
