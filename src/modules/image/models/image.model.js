import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 500,
    required: true,
  },
  path: {
    type: String,
    trim: true,
    required: true,
  },
});

const imageModel = mongoose.model("image", imageSchema);

export default imageModel;
