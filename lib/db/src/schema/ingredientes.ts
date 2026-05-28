import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { costeosTable } from "./costeos";

export const ingredientesTable = pgTable("ingredientes", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  marca: text("marca"),
  unidad: text("unidad").notNull(),
  cantidadCompra: numeric("cantidad_compra", { precision: 12, scale: 3 }).notNull(),
  precioCompra: numeric("precio_compra", { precision: 12, scale: 2 }).notNull(),
  stockActual: numeric("stock_actual", { precision: 12, scale: 3 }).notNull().default("0"),
  stockMinimo: numeric("stock_minimo", { precision: 12, scale: 3 }),
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertIngredienteSchema = createInsertSchema(ingredientesTable).omit({ id: true, createdAt: true });
export type InsertIngrediente = z.infer<typeof insertIngredienteSchema>;
export type Ingrediente = typeof ingredientesTable.$inferSelect;

export const costeoIngredientesTable = pgTable("costeo_ingredientes", {
  id: serial("id").primaryKey(),
  costeoId: integer("costeo_id")
    .notNull()
    .references(() => costeosTable.id, { onDelete: "cascade" }),
  ingredienteId: integer("ingrediente_id")
    .notNull()
    .references(() => ingredientesTable.id, { onDelete: "restrict" }),
  cantidadUsada: numeric("cantidad_usada", { precision: 12, scale: 3 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCosteoIngredienteSchema = createInsertSchema(costeoIngredientesTable).omit({ id: true, createdAt: true });
export type InsertCosteoIngrediente = z.infer<typeof insertCosteoIngredienteSchema>;
export type CosteoIngrediente = typeof costeoIngredientesTable.$inferSelect;
