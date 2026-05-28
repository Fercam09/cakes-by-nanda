import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { pedidosTable } from "./pedidos";

export const produccionTable = pgTable("produccion", {
  id: serial("id").primaryKey(),
  pedidoId: integer("pedido_id").notNull().references(() => pedidosTable.id, { onDelete: "cascade" }),
  ingredientesListos: boolean("ingredientes_listos").notNull().default(false),
  masaLista: boolean("masa_lista").notNull().default(false),
  horneado: boolean("horneado").notNull().default(false),
  enfriado: boolean("enfriado").notNull().default(false),
  decorado: boolean("decorado").notNull().default(false),
  empacado: boolean("empacado").notNull().default(false),
  listoParaEntregar: boolean("listo_para_entregar").notNull().default(false),
  notas: text("notas"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProduccionSchema = createInsertSchema(produccionTable).omit({ id: true, createdAt: true });
export type InsertProduccion = z.infer<typeof insertProduccionSchema>;
export type Produccion = typeof produccionTable.$inferSelect;
