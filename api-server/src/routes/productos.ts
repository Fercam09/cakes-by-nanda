import { Router } from "express";
import { db } from "@workspace/db";
import { productosTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// GET /productos - List all products
router.get("/productos", async (req, res) => {
  try {
    const productos = await db.select().from(productosTable).orderBy(productosTable.nombre);

    const result = productos.map((p) => ({
      ...p,
      precio: Number(p.precio),
      createdAt: p.createdAt?.toISOString(),
    }));

    res.json(result);
  } catch (err) {
    req.log.error(err, "Error listing productos");
    res.status(500).json({ error: "Error al listar productos" });
  }
});

// POST /productos - Create a product
router.post("/productos", async (req, res) => {
  try {
    const { nombre, descripcion, precio, disponible, imagen } = req.body;

    const [producto] = await db
      .insert(productosTable)
      .values({
        nombre,
        descripcion,
        precio: String(precio),
        disponible: disponible ?? true,
        imagen,
      })
      .returning();

    res.status(201).json({
      ...producto,
      precio: Number(producto.precio),
      createdAt: producto.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error creating producto");
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// GET /productos/:id - Get a product by ID
router.get("/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [producto] = await db.select().from(productosTable).where(eq(productosTable.id, id));

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
      ...producto,
      precio: Number(producto.precio),
      createdAt: producto.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error getting producto");
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

// PUT /productos/:id - Update a product
router.put("/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, descripcion, precio, disponible, imagen } = req.body;

    const [producto] = await db
      .update(productosTable)
      .set({
        nombre,
        descripcion,
        precio: String(precio),
        disponible,
        imagen,
      })
      .where(eq(productosTable.id, id))
      .returning();

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
      ...producto,
      precio: Number(producto.precio),
      createdAt: producto.createdAt?.toISOString(),
    });
  } catch (err) {
    req.log.error(err, "Error updating producto");
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// DELETE /productos/:id - Delete a product
router.delete("/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(productosTable).where(eq(productosTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error(err, "Error deleting producto");
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;
