import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
  image: {
    filename: {
      type: String,
      required: true
    },
  },
  available: {
    type: Boolean,
    required: false,
  },
});

const productModel = mongoose.model('product', productSchema)
export default productModel