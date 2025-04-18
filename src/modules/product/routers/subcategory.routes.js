import { Router } from "express";
import {
  attachAddQuery,
  attachDeleteQuery,
  attachFindQuery,
  attachUpdateQuery,
} from "../../../middlewares/query.middleware.js";
import subcategoryModel from "../models/subcategory.model.js";
import { executeQuery } from "../../../handlers/execute.handler.js";
import {
  attachCategoryId,
  filterSubcategories,
} from "../middlewares/filterSubcategories.middleware.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import {
  addSubcategorySchema,
  deleteSubcategorySchema,
  updateSubcategorySchema,
} from "../validations/subcategory.validations.js";
import { filterOne } from "../../../middlewares/features.middleware.js";
import { checkUniqueData } from "../../../middlewares/check.middleware.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(
    attachFindQuery(subcategoryModel),
    filterSubcategories(),
    executeQuery({ status: 200 })
  )
  .post(
    validate(addSubcategorySchema),
    checkUniqueData(subcategoryModel, "name"),
    attachCategoryId(),
    attachAddQuery(subcategoryModel),
    executeQuery({ status: 201 })
  );

router.route("/allsubcategories").get(
  // get all subcategories
  attachFindQuery(subcategoryModel),
  executeQuery({ status: 200 })
);

router
  .route("/:subcategorySlug")
  .get(
    attachFindQuery(subcategoryModel),
    filterOne({ fieldName: "slug", paramName: "subcategorySlug" }),
    filterSubcategories(),
    executeQuery({ status: 200 })
  )
  .put(
    validate(updateSubcategorySchema),
    checkUniqueData(subcategoryModel, "name"),
    attachUpdateQuery(subcategoryModel),
    filterOne({ fieldName: "slug", paramName: "subcategorySlug" }),
    attachCategoryId(),
    filterSubcategories(),
    executeQuery({ status: 200 })
  )
  .delete(
    validate(deleteSubcategorySchema),
    attachDeleteQuery(subcategoryModel),
    filterOne({ fieldName: "slug", paramName: "subcategorySlug" }),
    attachCategoryId(),
    filterSubcategories(),
    executeQuery({ status: 200 })
  );

export default router;
