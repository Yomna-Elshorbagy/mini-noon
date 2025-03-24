import { messages } from "../../../utils/constants/messages.js";
import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import categoryModel from "../models/category.model.js";

export const getCategories = catchAsyncError(async (req, res, next) => {
  const categories = await categoryModel.find({});
  res.status(200).json({ message: categories });
});

export const getCategory = catchAsyncError(async (req, res, next) => {
  const category = await categoryModel.findOne({ slug: req.params.slug });
  res.status(200).json({ message: category });
});

export const addCategory = catchAsyncError(async (req, res, next) => {
  let { name } = req.body;
  name = name.toLowerCase();

  // check existance file:
  if (!req.file) {
    return next(new AppError(messages.file.required, 400));
  }
  // check category exist
  const categorieExist = await categoryModel.findOne({ name });
  if (categorieExist)
    return next(new AppError(messages.category.alreadyExisist, 409));

  const category = await categoryModel.create(req.body);
  res.status(201).json({
    message: messages.category.createdSucessfully,
    sucess: true,
    data: category,
  });
});

export const updateCategory = catchAsyncError(async (req, res, next) => {
  const { slug } = req.params;
  const { name } = req.body;
  name = name.toLowerCase();

  // check category exist
  const categorieExist = await categoryModel.findOne({ slug });
  if (categorieExist)
    return next(new AppError(messages.category.alreadyExisist, 409));

  // check name exisit
  const nameExisist = await categoryModel.findOne({
    name,
    slug: { $ne: slug },
  });
  if (nameExisist)
    return next(new AppError(messages.category.alreadyExisist, 409));

  // prepare data and file
  if (name) {
    categorieExist.name = name;
  }
  const category = await categoryModel.updateOne({ slug }, req.body);
  res.status(200).json({
    message: messages.category.createdSucessfully,
    sucess: true,
    data: category,
  });
});

export const deleteCategory = catchAsyncError(async (req, res, next) => {
  // check category exist
  const categorieExist = await categoryModel.findOne({ slug });
  if (!categorieExist)
    return next(new AppError(messages.category.notFound, 404));

  const category = await categoryModel.deleteOne({ slug: req.params.slug });
  res.status(200).json({ message: category });
});
