import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (
    !product.name ||
    !product.price ||
    !product.image
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No product with that id");
    }
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.log("Error in updating product: ", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  export const deleteProduct =  async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      console.log("Error in deleting product: ", error.message);
      res.status(404).json({ success: false, message: "Product not found" });
    }
  };