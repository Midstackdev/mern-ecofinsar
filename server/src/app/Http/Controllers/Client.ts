import { NextFunction, Request, Response } from "express";
import Controller from "../../libs/routing/Controller";
import { ProductStat } from "../../Models/ProductStat";
import { User } from "../../Models/User";

export class ClientController extends Controller {
  public constructor() {
    super();
  }

  public async index(req: Request, res: Response) {
    super.jsonRes(
      {
        message: "REST API HOME ROUTE IS HEALTHY",
        type: "success",
      },
      res
    );
  }

  public async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const productWithStats = await ProductStat.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
        {
          $unwind: {
            path: "$products",
          },
        },
        // { $sort: { createdAt: -1 } },
        // {
        //   $facet: {
        //     metadata: [
        //       { $count: "total" },
        //       { $addFields: { page: Number(3) } },
        //     ],
        //     data: [{ $skip: 20 }, { $limit: 10 }], // add projection here wish you re-shape the docs
        //   },
        // },
      ]);

      super.jsonRes(productWithStats, res);
    } catch (error) {
      return next(error);
    }
  }

  public async getCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const customers = await User.findMany({ role: "user" }, "-password");

      super.jsonRes(customers, res);
    } catch (error) {
      return next(error);
    }
  }
}
