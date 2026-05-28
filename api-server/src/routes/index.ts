import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pedidosRouter from "./pedidos";
import productosRouter from "./productos";
import recetasRouter from "./recetas";
import produccionRouter from "./produccion";
import dashboardRouter from "./dashboard";
import comprasRouter from "./compras";
import gastosRouter from "./gastos";
import costeosRouter from "./costeos";
import ingredientesRouter from "./ingredientes";
import configuracionRouter from "./configuracion";
import publicoRouter from "./publico";
import fechasBloqueadasRouter from "./fechas-bloqueadas";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(pedidosRouter);
router.use(productosRouter);
router.use(recetasRouter);
router.use(produccionRouter);
router.use(dashboardRouter);
router.use(comprasRouter);
router.use(gastosRouter);
router.use(costeosRouter);
router.use(ingredientesRouter);
router.use(configuracionRouter);
router.use(publicoRouter);
router.use(fechasBloqueadasRouter);
router.use(storageRouter);

export default router;
