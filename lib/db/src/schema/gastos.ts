import { pgTable, serial, text, numeric, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const gastosTable = pgTable("gastos", {
  id: serial("id").primaryKey(),
  fecha: date("fecha").notNull(),
  categoria: text("categoria").notNull(),
  descripcion: text("descripcion").notNull(),
  monto: numeric("monto", { precision: 12, scale: 2 }).notNull(),
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGastoSchema = createInsertSchema(gastosTable).omit({ id: true, createdAt: true });
export type InsertGasto = z.infer<typeof insertGastoSchema>;
export type Gasto = typeof gastosTable.$inferSelect;
