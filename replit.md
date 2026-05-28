# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains **Cakes by Nanda** (formerly "La Cajita Dulce") — a Costa Rican mini-cake bakery management system. Internal order management + public customer ordering portal.

## Brand

- **Name**: Cakes by Nanda · tagline "Homemade Mini Cakes" / "Hecho con amor por Nanda"
- **Logo**: `artifacts/pasteleria/public/logo.png` (cropped from official brand board, 800x800)
- **Palette** (in `artifacts/pasteleria/src/index.css` as HSL tokens + `--brand-*` custom props): Ivory `#FFF3EF`, Soft Cream `#F5EDE7`, Strawberry `#E5ADA8` (primary), Blush `#F2C6C2`, Dusty Rose `#D88F8A`, Pistachio `#C6C09C`, Sage `#A8B5A2`, Deep Sage `#6F7D6B`, Caramel `#D0A77B`, Chocolate `#725C3F` (foreground)
- **Type**: Playfair Display (titles), Pinyon Script (script "by"), Montserrat (body) — loaded from Google Fonts in `index.html`
- **Tailwind utilities**: `text-brand-{rose|sage|deep-sage|chocolate|caramel|pistachio|cream|blush}`, `bg-brand-cream`, `bg-brand-sage-soft`, `bg-brand-blush-soft`, `font-script`
- **Primary button contrast**: `--primary-foreground` is chocolate (not white) for AA legibility on light rose
- **Public brand name** is returned from `GET /api/publico/menu` as `nombreNegocio` (hardcoded in `artifacts/api-server/src/routes/publico.ts`, NOT in DB)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifact: pasteleria, at /)
- **API framework**: Express 5 (artifact: api-server, at /api)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **UI**: shadcn/ui, Tailwind CSS, Lucide icons

## Application Features

- **Dashboard**: Summary cards (active orders, completed, pending payment, total sales), today's deliveries, quick access buttons
- **Pedidos (Orders)**: Full CRUD, filters by status/payment, search by customer name, mark as completed, export to CSV. New estados include `pendiente_aprobacion` (incoming customer orders) and `rechazado`. Approve / reject buttons appear for orders in `pendiente_aprobacion`. Method-of-payment badge (Sinpe / Efectivo) in list and detail. **Layout polls every 30s** for new `pendiente_aprobacion` orders and shows a red badge in the sidebar/mobile header, plays a beep, and (when permission granted) fires a desktop Notification.
- **Productos (Products)**: Manage cake flavors/products with price, availability toggle, and **photo upload** (object storage; image previewed on the public menu and admin cards)
- **Recetas (Recipes)**: Private recipe organizer with ingredients, steps, yield, cost
- **Produccion (Production)**: Per-order checklists with 6 steps and progress bar. Auto-created when an admin approves a public order.
- **Costos (Cost Calculator)**: Multiple saved costings per recipe (`costeos` table) with edit/delete; price calculator persists results. Each costeo can include line items (`costeo_ingredientes`) that pick from the Ingredientes catalog with cantidad usada — server auto-computes `costoIngredientes` from those lineas. Falls back to manual entry if no lineas. Atomic via DB transaction; rejects unknown ingrediente IDs (400).
- **Ingredientes (Ingredient Catalog)**: CRUD of base ingredients (nombre, marca, unidad, cantidadCompra, precioCompra, **stockActual, stockMinimo**). Computes costo unitario = precioCompra / cantidadCompra and exposes it via API + UI live preview. Stock is editable inline with +/- buttons (PATCH `/api/ingredientes/:id/stock` { delta }). A page-level alert lists ingredients whose stock fell at/below their minimum. Delete is blocked (409) when an ingredient is referenced by any costeo (also enforced at DB level via ON DELETE RESTRICT FK).
- **Gastos (Expenses)**: Categorized expense tracking with monthly profit summary (ventas - gastos = ganancia) and breakdown by category.
- **Calendario (Calendar)**: Monthly calendar view of delivery dates. Tap an empty day to **block** it (vacaciones / días familiares); blocked days show a red ban icon, are listed in a dedicated section, and are rejected by the public order endpoint. Backed by `fechas_bloqueadas` table and `/api/fechas-bloqueadas` CRUD.
- **Pasos (Launch Checklist)**: 4-phase / 18-step checklist for getting the bakery up and running, persisted in localStorage.
- **Ajustes (Settings)**: Configure Sinpe Móvil number / name / instructions and the welcome message that appears on the public menu. Includes copy-to-clipboard for the public ordering link.
- **Customer Portal (public)**:
  - `/pedir` — public order form. Customers add products to a cart (with **product photos**), fill name + phone + delivery date + notes, choose **payment method** (Sinpe Móvil / Efectivo), and submit. Renders without the admin sidebar. Blocked dates surfaced via `GET /api/publico/menu` (`fechasBloqueadas`) and the form rejects them client-side; server also rejects with 409.
  - `/mi-pedido/:slug` — public per-order tracking page. Customer sees only their order: status, items, totals, **payment method badge**, Sinpe payment info OR cash-on-delivery message, production progress (4 steps). Never exposes other orders, costs, or expenses.
  - Order creation accepts structured items only; the server recomputes totals from the catalog (clients cannot tamper with prices) and validates dates/phone/name lengths.

## PWA

The pasteleria app is **installable as a PWA**. `public/manifest.webmanifest` declares name, icons (using `logo.png`), `display: standalone`, and theme color. `public/sw.js` is a minimal pass-through service worker registered from `index.html` (relative to `document.baseURI` to respect the artifact base path). No precaching to avoid stale builds.

## Object Storage (Image Uploads)

Replit App Storage is wired up in api-server (`src/lib/objectStorage.ts`). Frontend helpers live in `artifacts/pasteleria/src/lib/object-url.ts` (`uploadFileToObjectStorage`, `objectPathToUrl`) and the reusable `<ImageUpload>` component (`src/components/image-upload.tsx`). Flow: client POSTs metadata to `/api/storage/uploads/request-url` → gets a Google Cloud Storage signed PUT URL → uploads file directly to GCS → stores the resulting `objectPath` (e.g. `/objects/uploads/<uuid>`) in `productos.imagen`. Display path is rewritten through `objectPathToUrl` to `${BASE_URL}/api/storage<path>`.

## Database Tables

- `pedidos` — orders. Adds `slug` (unique, used by public tracking links), `referenciaSinpe`, `origenCliente` (`web` | `admin`).
- `productos` — products/cake flavors
- `recetas` — recipes
- `produccion` — production checklists (linked to pedidos)
- `gastos` — categorized expenses
- `costeos` — saved cost calculations per recipe
- `ingredientes` — catalog of base ingredients with purchase price + quantity (used to auto-compute costoIngredientes)
- `costeo_ingredientes` — join table linking each costeo to N ingredientes with cantidadUsada (FK cascade on costeo, restrict on ingrediente)
- `configuracion` — single-row settings (Sinpe info, welcome message)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## API Routes

- `GET/POST /api/pedidos` — list/create orders
- `GET/PUT/DELETE /api/pedidos/:id` — get/update/delete order
- `PATCH /api/pedidos/:id/estado` — update order status/payment
- `GET/POST /api/productos` — list/create products
- `GET/PUT/DELETE /api/productos/:id` — get/update/delete product
- `GET/POST /api/recetas` — list/create recipes
- `GET/PUT/DELETE /api/recetas/:id` — get/update/delete recipe
- `GET/POST /api/produccion` — list/create production checklists
- `PUT /api/produccion/:id` — update checklist
- `GET /api/dashboard/resumen` — dashboard summary stats
- `GET /api/dashboard/pedidos-hoy` — today's deliveries
- `GET /api/dashboard/calendario` — orders grouped by delivery date
- `GET/POST /api/costeos` — list/create costings (POST body accepts optional `lineas: [{ingredienteId, cantidadUsada}]` → server computes `costoIngredientes`)
- `PUT/DELETE /api/costeos/:id` — update/delete costing
- `GET/POST /api/ingredientes` — list/create catalog ingredients (now includes `stockActual`, `stockMinimo`)
- `PUT/DELETE /api/ingredientes/:id` — update/delete; DELETE returns 409 if in use
- `PATCH /api/ingredientes/:id/stock` — adjust stock by signed delta (server clamps to ≥ 0)
- `GET/POST/DELETE /api/fechas-bloqueadas` — manage blocked delivery dates (DELETE by `fecha`, format `YYYY-MM-DD`)
- `POST /api/storage/uploads/request-url` — request a signed PUT URL for direct GCS upload
- `GET /api/storage/objects/*` and `/api/storage/public-objects/*` — serve uploaded files

## Notes on API Codegen Fix

The orval config was modified to remove `schemas: { path: "generated/types" }` from the zod target to avoid duplicate exports. The `lib/api-zod/src/index.ts` file exports only from `./generated/api` (not types, which was auto-generated by orval with the old config).
