import { NextFunction, Request, Response } from "express";
import searchServics from "../services/searchServics";
import { HttpCode } from "../types/httpCode";

export default {

  searchKeyword: async (req: Request, res: Response, next: NextFunction) => {
    const keyword = req.query.keyword as string;

    try {
      const data = await searchServics.searchKeyword(keyword);
      res.status(HttpCode.OK).json({
        message: 'success',
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};