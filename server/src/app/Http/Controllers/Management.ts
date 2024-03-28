import { NextFunction, Request, Response } from "express";
import Controller from "../../libs/routing/Controller";
import { User } from "../../Models/User";
import { Transaction } from "../../Models/Transaction";
import mongoose from "mongoose";

export class ManagementController extends Controller {
  public constructor() {
    super();
  }

  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await User.findMany({ role: "admin" }, "-password");

      super.jsonRes(customers, res);
    } catch (error) {
      return next(error);
    }
  }

  public async getUserPerformance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const saleTransactions = await Transaction.aggregate([
        // { $match: { userId: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            pipeline: [
              { $match: { _id: new mongoose.Types.ObjectId(id) } },
              {
                $project: {
                  _id: 1,
                  email: 1,
                  name: 1,
                  phoneNumber: 1,
                },
              },
            ],
            as: "user",
          },
        },
        { $unwind: { path: "$user" } },
        {
          //find just one and use the sales id to get transactions
          $lookup: {
            from: "affiliatestats",
            let: { ownerId: "$user._id" },
            // localField: "ownerId",
            // foreignField: "_id",
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$userId", "$$ownerId"] },
                      // { $eq: ["$userId", new mongoose.Types.ObjectId(id)] },
                    ],
                  },
                },
              },
              // { $match: { userId: new mongoose.Types.ObjectId(id) } },
              // {
              //   $project: {
              //     _id: 1,
              //     email: 1,
              //     name: 1,
              //     phoneNumber: 1,
              //   },
              // },
            ],
            as: "user.affiliatestats",
          },
        },
        { $unwind: { path: "$user.affiliatestats" } },
        // {
        //   $match: {
        //     "user.affiliatestats": {
        //       $exists: true,
        //     },
        //   },
        // },
      ]);

      super.jsonRes(saleTransactions, res);
    } catch (error) {
      return next(error);
    }
  }
}
