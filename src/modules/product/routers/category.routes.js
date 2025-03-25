import { Router } from "express";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import categoryModel from "../models/category.model.js";
import { executeQuery } from "../../../handlers/execute.handler.js";
import { filterOne } from "../../../middlewares/features.middleware.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { addCategorySchema, deleteCategorySchema, updateCategorySchema } from "../validations/category.validations.js";
import subcategoriesRouter from './subcategory.routes.js'

const router = Router();

router
  .route("/")
  .get(attachFindQuery(categoryModel), executeQuery())
  .post(
    validate(addCategorySchema),
    attachAddQuery(categoryModel),
    executeQuery({ status: 201 })
  );

router
  .route("/:categorySlug")
  .get(
    attachFindQuery(categoryModel),
    filterOne({ fieldName: "slug", paramName: "categorySlug" }),
    executeQuery()
  ).put(
    validate(updateCategorySchema),
    attachUpdateQuery(categoryModel),
    filterOne({ fieldName: "slug",paramName: "categorySlug" }),
    executeQuery()
  ).delete(
    validate(deleteCategorySchema),
    attachDeleteQuery(categoryModel),
    filterOne({ fieldName: "slug",paramName: "categorySlug" }),
    executeQuery()
  );

router.use("/:categorySlug/subcategories", subcategoriesRouter);

export default router;
