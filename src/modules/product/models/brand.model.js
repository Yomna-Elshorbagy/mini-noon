import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 200,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      minLength: 3,
      maxLength: 200,
      trim: true,
      unique: true,
    },
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "image",
    },
  },
  { timestamps: true }
);

brandSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

brandSchema.pre("findOneAndUpdate", function (next) {
  this._update.slug = slugify(this._update.title, { lower: true });
  next();
});

const brandModel = mongoose.model("brand", brandSchema);

export default brandModel;
