import { Router } from "express";
import {
  attachAddQuery,
  attachFindQuery,
} from "../../../middlewares/query.middleware.js";
import subcategoryModel from "../models/subcategory.model.js";
import { executeQuery } from "../../../handlers/execute.handler.js";
import { filterSubcategories } from "../middlewares/filterSubcategories.middleware.js";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(
    attachFindQuery(subcategoryModel),
    filterSubcategories(),
    executeQuery({ status: 200 })
  )
  .post(attachAddQuery(subcategoryModel), executeQuery({ status: 201 }));

export default router;
