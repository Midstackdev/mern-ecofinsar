import { NextFunction, Request, Response } from "express";
import Controller from "../../libs/routing/Controller";
import { Transaction } from "../../Models/Transaction";
import { OverallStat } from "../../Models/OverallStat";
import { IOverallStat } from "../../DbSchema/overallStat";

export class HomeController extends Controller {
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

  public async dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const currentYear = 2021;
      const currentMonth = "November";
      const currentDay = "2021-11-15";

      const transactions = await Transaction.getLatest();

      const overallStat: IOverallStat[] = await OverallStat.all({
        year: currentYear,
      });

      const {
        totalCustomers,
        yearlyTotalSoldUnits,
        monthlyData,
        dailyData,
        salesByCategory,
        yearlySalesTotal,
      } = overallStat[0];

      const thisMonthStats = monthlyData.find(({ month }) => {
        return month === currentMonth;
      });

      const todayStats = dailyData.find(({ date }) => {
        return date === currentDay;
      });

      super.jsonRes(
        {
          totalCustomers,
          yearlySalesTotal,
          monthlyData,
          salesByCategory,
          yearlyTotalSoldUnits,
          thisMonthStats,
          todayStats,
          transactions,
        },
        res
      );
    } catch (error) {
      return next(error);
    }
  }
}
