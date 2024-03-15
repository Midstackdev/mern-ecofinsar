/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import mongoose, { Document, Schema } from "mongoose";

export type ITransaction = {
  _id?: string;
  userId: string;
  cost: string;
  products: [];
};

export type TransactionDoc = ITransaction & Document;

/*
 * Create the schmema that will reflect the MongoDB collection
 */
const TransactionSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cost: { type: String },
    products: { type: [mongoose.Types.ObjectId], of: Number },
  },
  { timestamps: true }
);

export default mongoose.model<TransactionDoc>("Transaction", TransactionSchema);
