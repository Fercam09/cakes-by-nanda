import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const configuracionTable = pgTable("configuracion", {
  id: serial("id").primaryKey(),
  numeroSinpe: text("numero_sinpe"),
  nombreSinpe: text("nombre_sinpe"),
  instruccionesSinpe: text("instrucciones_sinpe"),
  mensajeBienvenida: text("mensaje_bienvenida"),
  pasosCompletados: jsonb("pasos_completados").$type<Record<string, boolean>>().default({}).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Configuracion = typeof configuracionTable.$inferSelect;
