import { pgTable, serial, text, numeric, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const costeosTable = pgTable("costeos", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  costoIngredientes: numeric("costo_ingredientes", { precision: 12, scale: 2 }).notNull().default("0"),
  costoEmpaque: numeric("costo_empaque", { precision: 12, scale: 2 }).notNull().default("0"),
  otrosCostos: numeric("otros_costos", { precision: 12, scale: 2 }).notNull().default("0"),
  cantidad: integer("cantidad").notNull().default(1),
  margenGanancia: numeric("margen_ganancia", { precision: 6, scale: 2 }).notNull().default("50"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCosteoSchema = createInsertSchema(costeosTable).omit({ id: true, createdAt: true });
export type InsertCosteo = z.infer<typeof insertCosteoSchema>;
export type Costeo = typeof costeosTable.$inferSelect;
