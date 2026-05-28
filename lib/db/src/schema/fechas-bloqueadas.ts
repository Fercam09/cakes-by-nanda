import { pgTable, serial, text, timestamp, date } from "drizzle-orm/pg-core";

export const fechasBloqueadasTable = pgTable("fechas_bloqueadas", {
  id: serial("id").primaryKey(),
  fecha: date("fecha").notNull().unique(),
  motivo: text("motivo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type FechaBloqueada = typeof fechasBloqueadasTable.$inferSelect;
