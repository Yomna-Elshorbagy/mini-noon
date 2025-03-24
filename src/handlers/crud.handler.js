import { messages } from "../../../utils/constants/messages.js";
import { AppError, catchAsyncError } from "../utils/error.handler.js";

export const getDocuments = (model) => {
  catchAsyncError(async (req, res, next) => {
    const categories = await categoryModel.find({});
    res.status(200).json({ message: categories });
  });
};
export const getDocument = (model) => {
  catchAsyncError(async (req, res, next) => {
    const category = await model.findOne({ slug: req.params.slug });
    res.status(200).json({ message: category });
  });
};

export const addDocument = (model) => {
  catchAsyncError(async (req, res, next) => {
    let { name } = req.body;
    name = name.toLowerCase();

    // check existance file:
    if (!req.file) {
      return next(new AppError(messages.file.required, 400));
    }
    // check category exist
    const categorieExist = await model.findOne({ name });
    if (categorieExist)
      return next(new AppError(messages.category.alreadyExisist, 409));

    const category = await model.create(req.body);
    res.status(201).json({
      message: messages.category.createdSucessfully,
      sucess: true,
      data: category,
    });
  });
};

export const updateDocument = (model) => {
  catchAsyncError(async (req, res, next) => {
    const { slug } = req.params;
    const { name } = req.body;
    name = name.toLowerCase();

    // check category exist
    const categorieExist = await model.findOne({ slug });
    if (categorieExist)
      return next(new AppError(messages.category.alreadyExisist, 409));

    // check name exisit
    const nameExisist = await model.findOne({
      name,
      slug: { $ne: slug },
    });
    if (nameExisist)
      return next(new AppError(messages.category.alreadyExisist, 409));

    // prepare data and file
    if (name) {
      categorieExist.name = name;
    }
    const category = await model.updateOne({ slug }, req.body);
    res.status(200).json({
      message: messages.category.createdSucessfully,
      sucess: true,
      data: category,
    });
  });
};

export const deleteDocument = (model) => {
  catchAsyncError(async (req, res, next) => {
    // check category exist
    const categorieExist = await model.findOne({ slug });
    if (!categorieExist)
      return next(new AppError(messages.category.notFound, 404));

    const category = await model.deleteOne({ slug: req.params.slug });
    res.status(200).json({ message: category });
  });
};
