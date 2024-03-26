import { NextFunction, Request, Response } from "express";
import Controller from "../../libs/routing/Controller";
import { User } from "../../Models/User";

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
}
