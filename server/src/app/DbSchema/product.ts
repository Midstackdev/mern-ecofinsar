/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import mongoose, { Document, Schema } from "mongoose";

export type IProduct = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
};

export type ProductDoc = IProduct & Document;

/*
 * Create the schmema that will reflect the MongoDB collection
 */
const ProductSchema: Schema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    rating: { type: Number },
    supply: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model<ProductDoc>("Product", ProductSchema);
