import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const comprasTable = pgTable("compras", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  cantidad: text("cantidad"),
  comprado: boolean("comprado").notNull().default(false),
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCompraSchema = createInsertSchema(comprasTable).omit({ id: true, createdAt: true });
export type InsertCompra = z.infer<typeof insertCompraSchema>;
export type Compra = typeof comprasTable.$inferSelect;
