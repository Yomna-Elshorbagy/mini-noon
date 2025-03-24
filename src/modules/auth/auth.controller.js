import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, catchAsyncError } from "../../utils/error.handler.js";
import userModel from "../user/models/user.model.js";
import { messages } from "../../utils/constants/messages.js";

export const signin = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AppError(messages.user.invalidCredential, 400);
  }
  const { name, role, _id: id } = user;
  const token = jwt.sign({ name, role, id, email }, process.env.SECRET);
  res.json({ token });
});

export const signup = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, +process.env.SALT);

  await userModel.create({
    name,
    email,
    password: hashed,
  });
  res.status(201).json({ message: messages.user.createdSucessfully });
});

export const validateEmail = catchAsyncError(async (req, res) => {
  const { token } = req.params;
  try {
    const { email } = req.body;
    const decoded = jwt.verify(token);
    await userModel.findOneAndUpdate({ email }, { email_verified: true });
    res.status(200).json({ message: messages.user.verifiedSucessfully });
  } catch (error) {
    throw new AppError(error.message, 400);
  }
});
