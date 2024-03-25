/**
 * This page demonstrates how to use interfaces, Models and schmas to effectivley interact with MongoDB
 */

import mongoose, { Document, Schema } from "mongoose";
import { DailylyData, MonthlyData } from "./productStat";

export type IOverallStat = {
  _id?: string;
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: MonthlyData[];
  dailyData: DailylyData[];
  salesByCategory: {};
};

export type OverallStatDoc = IOverallStat & Document;

/*
 * Create the schmema that will reflect the MongoDB collection
 */
const OverallStatSchema: Schema = new Schema(
  {
    totalCustomers: { type: Number },
    yearlySalesTotal: { type: Number },
    yearlyTotalSoldUnits: { type: Number },
    year: { type: Number },
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
    salesByCategory: { type: Map, of: Number },
  },
  { timestamps: true }
);

export default mongoose.model<OverallStatDoc>("OverallStat", OverallStatSchema);
