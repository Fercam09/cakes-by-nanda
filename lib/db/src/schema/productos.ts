import { pgTable, serial, text, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productosTable = pgTable("productos", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  descripcion: text("descripcion"),
  precio: numeric("precio", { precision: 10, scale: 2 }).notNull(),
  disponible: boolean("disponible").notNull().default(true),
  imagen: text("imagen"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductoSchema = createInsertSchema(productosTable).omit({ id: true, createdAt: true });
export type InsertProducto = z.infer<typeof insertProductoSchema>;
export type Producto = typeof productosTable.$inferSelect;
