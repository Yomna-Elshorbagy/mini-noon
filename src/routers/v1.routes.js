import { Router } from "express";
import categoriesRouter from "../modules/product/routers/category.routes.js";
import subcategoriesRouter from "../modules/product/routers/subcategory.routes.js";
import productsRouter from "../modules/product/routers/products.routes.js";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/subcategories", subcategoriesRouter);
router.use("/products", productsRouter);

export default router;
