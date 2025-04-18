import { Router } from "express";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import productModel from "../models/products.model.js";
import { executeQuery } from "../../../handlers/execute.handler.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import {
  addProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "../validations/products.validations.js";
import {
  filterOne,
  filterQuery,
  paginateQuery,
  populateQuery,
  searchQuery,
  selectFieldsQuery,
  sortQuery,
} from "../../../middlewares/features.middleware.js";

const router = Router();

router
  .route("/")
  .get(
    attachFindQuery(productModel),
    paginateQuery(20),
    populateQuery("subcategory_id", ["name"]),
    sortQuery(),
    selectFieldsQuery(),
    searchQuery(["title", "description"]),
    filterQuery(),
    executeQuery()
  )
  .post(
    validate(addProductSchema),
    attachAddQuery(productModel),
    executeQuery()
  );

router
  .route("/:productSlug")
  .get(
    attachFindQuery(productModel),
    filterOne({ fieldName: "slug", paramName: "productSlug" }),
    executeQuery()
  )
  .put(
    validate(updateProductSchema),
    attachUpdateQuery(productModel),
    filterOne({ fieldName: "slug", paramName: "productSlug" }),
    executeQuery()
  )
  .delete(
    validate(deleteProductSchema),
    attachDeleteQuery(productModel),
    filterOne({ fieldName: "slug", paramName: "productSlug" }),
    executeQuery()
  );
export default router;
