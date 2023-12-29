import mongoose, { model } from "mongoose";
import { Info } from "../types/info";

const Schema = mongoose.Schema;

const infoSchema = new Schema<Info>({
  id: { type: Number, required: true },
  placeName: { type: String, required: true },
  addressName: { type: String, required: true },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const underwayInfoModel = model<Info>("underwayInfo", infoSchema);

export default underwayInfoModel;