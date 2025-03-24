import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  //product_id if the title not unique
  product_id: {
    type: String,
    minLength: 6,
    maxLength: 20,
    validator,
  },
  title: {
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
  description: {
    type: String,
    minLength: 3,
    maxLength: 10000,
    required: true,
    trim: true,
  },
  stock: {
    min: 0,
    required: true,
  },
  price: {
    type: Number,
    min: 0.01,
    required: true,
  },
  discounted_price: {
    type: Number,
    min: 0.01,
    validate: {
      validator: function (value) {
        return value <= this.price;
      },
      message: "The discounted price must not exceed the initial price",
    },
  },
  cover_image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "image",
  },
  features: [
    {
      key: String,
      value: String,
    },
  ],
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

productSchema.pre("updateMany", function (next) {
  this._update.slug = slugify(this._update.title, { lower: true });
  next();
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
