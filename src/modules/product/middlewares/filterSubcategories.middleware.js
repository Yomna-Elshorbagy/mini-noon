import { messages } from "../../../utils/constants/messages.js";
import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import categoryModel from "../models/category.model.js";

export const filterSubcategories = () =>
  catchAsyncError(async (req, res, next) => {
    const { categorySlug } = req.params;
    const category = await categoryModel.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ message: messages.category.notFound });
    }
    req.dbQuery = req.dbQuery.where({ category_id: category._id });
    next();
  });

export const attachCategoryId = () =>
  catchAsyncError(async (req, res, next) => {
    const { categorySlug } = req.params;
    const category = await categoryModel.findOne({ slug: categorySlug });
    if (!category) {
      return next(new AppError(messages.category.notFound, 404));
    }
    //attach in body
    req.body.category_id = category._id;
    req.parent = category;
    next();
  });

// Optimized Generic Filtering & Parent Attachment Middleware
export const filterByParent = (childField) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.parent) {
      return next(new Error("Parent entity not found"));
    }
    req.dbQuery = req.dbQuery.where({ [childField]: req.parent._id });
    next();
  });

export const attachParent = (model, parentField, paramField) =>
  catchAsyncError(async (req, res, next) => {
    const parent = await model.findOne({
      [parentField]: req.params[paramField],
    });
    if (!parent) {
      return next(new Error(`Parent not found for ${paramField}`));
    }
    req.body[parentField] = parent._id;
    req.parent = parent;
    next();
  });
