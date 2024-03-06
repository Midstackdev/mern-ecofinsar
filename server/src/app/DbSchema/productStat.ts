/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import mongoose, { Document, Schema } from "mongoose";

type Common = {
  totalSales: number;
  totalUnits: number;
};

type MonthlyData = { month: string } & Common;
type DailylyData = { date: string } & Common;

export type IProductStat = {
  _id?: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailylyData[];
};

export type ProductStatDoc = IProductStat & Document;

/*
 * Create the schmema that will reflect the MongoDB collection
 */
const ProductStatSchema: Schema = new Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    yearlySalesTotal: { type: Number },
    yearlyTotalSoldUnits: { type: Number },
    year: { type: Number },
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
  },
  { timestamps: true }
);

export default mongoose.model<ProductStatDoc>("ProductStat", ProductStatSchema);
