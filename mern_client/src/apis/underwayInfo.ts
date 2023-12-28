import { Info } from "../types/info";
import axios from "axios";

export const getUnderwayInfos = () => axios.get<Info[]>('/api/getUnderwayInfos');