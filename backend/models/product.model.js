import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Tshirt
      required: true,
    },
    price: {
      type: Number, // 100
      required: true,
    },
    image: {
      type: String, // image.jpg
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
