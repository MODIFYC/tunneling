import { Info } from "../types/info";
import axios from "axios";

export const createInfo = (info: Info) => axios.post<Info, { message: string }>('/api/infos', info);
