import { NextFunction, Request, Response } from "express";
import underwayInfosService from "../services/unserwayInfosService";
import { HttpException } from "../middlewares/errorHandler";
import { HttpCode } from "../types/httpCode";
import { info } from "console";
import { Info } from "../types/info";

export default {
  saveUnderwayInfos: async (req: Request, res: Response, next: NextFunction) => {
    const info = req.body as Info;
    try {
      const underwayInfos = await underwayInfosService.saveUnderwayInfos();
      res.status(HttpCode.OK).json({
        message: 'success',
        data: underwayInfos,
      });
    } catch (error) {
      next(error);
    }
  },

  getUnderwayInfos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await underwayInfosService.getUnderwayInfos();
      res.status(HttpCode.OK).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
