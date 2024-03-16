import { NextFunction, Request, Response } from "express";
import Controller from "../../libs/routing/Controller";
import { ProductStat } from "../../Models/ProductStat";
import { User } from "../../Models/User";
import { Transaction } from "../../Models/Transaction";
import { getCountryISO3 } from "ts-country-iso-2-to-3";
import { IUser } from "../../DbSchema/user";

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

  public async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

      const generateSort = () => {
        const sortParsed = JSON.parse(sort as string);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };

        return sortFormatted;
      };

      const sortFormatted = Boolean(sort) ? generateSort() : {};

      const where = {
        $or: [
          { cost: { $regex: new RegExp(search as string, "i") } },
          // { userId: { $regex: new RegExp(search as string, "i") } },
        ],
      };
      const skip = (page as number) * (pageSize as number);

      const transactions = await Transaction.getTransactions({
        where,
        sort: sortFormatted,
        skip,
        limit: pageSize,
      });

      const total = await Transaction.count({
        // name: { $regex: search, $options: "i" },
        ...where,
      });

      super.jsonRes({ transactions, total }, res);
    } catch (error) {
      return next(error);
    }
  }

  public async getGeography(req: Request, res: Response, next: NextFunction) {
    try {
      const customers: IUser[] = await User.findMany(
        { role: "user" },
        "-password"
      );

      const mappedLocations = customers.reduce((acc: any, { country }) => {
        const countryISO3 = getCountryISO3(country as string);
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      }, {});

      // console.log("---fff---", Object.entries(mappedLocations));

      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return {
            id: country,
            value: count,
          };
        }
      );

      super.jsonRes(formattedLocations, res);
    } catch (error) {
      return next(error);
    }
  }
}
