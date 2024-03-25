import { NextFunction, Request, Response } from "express";
import Controller from "../../libs/routing/Controller";
import { OverallStat } from "../../Models/OverallStat";

export class SaleController extends Controller {
  public constructor() {
    super();
  }

  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      const overallStats = await OverallStat.find();

      super.jsonRes(overallStats[0], res);
    } catch (error) {
      return next(error);
    }
  }
}
