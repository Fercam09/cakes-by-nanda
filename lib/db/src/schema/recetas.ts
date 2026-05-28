import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const recetasTable = pgTable("recetas", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  ingredientes: text("ingredientes").notNull(),
  pasos: text("pasos"),
  rendimiento: integer("rendimiento"),
  costoEstimado: numeric("costo_estimado", { precision: 10, scale: 2 }),
  tiempoHorno: text("tiempo_horno"),
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRecetaSchema = createInsertSchema(recetasTable).omit({ id: true, createdAt: true });
export type InsertReceta = z.infer<typeof insertRecetaSchema>;
export type Receta = typeof recetasTable.$inferSelect;
