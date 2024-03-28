/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import mongoose, { Document, Schema } from "mongoose";

export type IAffiliateStat = {
  _id?: string;
  userId: string;
  affiliateSales: [];
};

export type AffiliateStatDoc = IAffiliateStat & Document;

/*
 * Create the schmema that will reflect the MongoDB collection
 */
const AffiliateStatSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    affiliateSales: { type: [mongoose.Types.ObjectId], ref: "Transaction" },
  },
  { timestamps: true }
);

export default mongoose.model<AffiliateStatDoc>(
  "AffiliateStat",
  AffiliateStatSchema
);
