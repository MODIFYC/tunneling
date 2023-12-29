import { HttpException } from "../middlewares/errorHandler";
import InfoModel from "../model/info";
import { HttpCode } from "../types/httpCode";
import { Info } from "../types/info";

//요청받은 데이터를 받아와 저장하는 로직
export default {
  createInfo: async (info: Info) => {
    try {
      const result = await InfoModel.create(info)
      return result;
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
    }
  },

  getInfo: async (id: number) => {
    try {
      const result = await InfoModel.findOne({ id });
      return result;
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
    }
  },

  getInfos: async () => {
    try {
      const result = await InfoModel.find({}, { _id: 0, __v: 0 });
      return result;
    } catch (error) {
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
    }
  },

};