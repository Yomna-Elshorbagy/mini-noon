import jwt from "jsonwebtoken";
import { AppError, catchAsyncError } from "../../utils/error.handler.js";
import userModel from "../user/models/user.model.js";

export const authenticate = (req, res, next) => {
  const token = req.headers("token");

  if (!token || !token.startsWith("Bearer")) {
    throw new AppError("Unauthorized", 401);
  }

  const bearerToken = token.split(" ")[1];
  try {
    const decode = jwt.verify(bearerToken, process.env.SECRET);
    req.user = decode;
    next();
  } catch (error) {
    throw new AppError(error.message, 498);
  }
};

export const authorize = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) throw new AppError("Forbidden", 403);
    next();
  };
};

export const assertUniqueEmail2 = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) throw new AppError("This email is already taken", 400);
  next();
});

export const assertUniqueEmail = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) throw new AppError("This email is already taken", 400);
  next();
});
