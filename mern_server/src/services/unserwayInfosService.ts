import axios from "axios";
import { HttpException } from "../middlewares/errorHandler";
import underwayInfoModel from "../model/underwayInfo";
import { HttpCode } from "../types/httpCode";
import { SearchResponse } from "../types/search";

//요청받은 데이터를 받아와 저장하는 로직
export default {

  // 지하차도 정보 db에 저장
  saveUnderwayInfos: async () => {
    try {
      // Kakao API를 통해 *지하차도 정보 검색
      const result = await axios.get<SearchResponse>(encodeURI(`https://dapi.kakao.com/v2/local/search/keyword?query=*지하차도`), {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
        },
      });

      const underwayInfos = result.data.documents.map((item) => ({
        id: Number(item.id),
        placeName: item.place_name,
        addressName: item.address_name,
        position: {
          lat: Number(item.y),
          lng: Number(item.x),
        },
      }));
      console.log(underwayInfos)
      // MongoDB에 *지하차도 정보 저장
      await underwayInfoModel.create(underwayInfos);

      return underwayInfos;
    } catch (error) {
      console.error("Error while saving underway info to MongoDB:", error);
      throw new HttpException(HttpCode.INTERNAL_SERVER_ERROR, '서버 에러');
    }
  },

  //지하차도 정보 요청시 클라이언트 전송
  getUnderwayInfos: async () => {
    try {
      const result = await underwayInfoModel.find({}, { _id: 0, __v: 0 });
      return result;
    } catch (error) {
      throw new HttpException(
        HttpCode.INTERNAL_SERVER_ERROR,
        "DB 서버 에러"
      );
    }
  },

};