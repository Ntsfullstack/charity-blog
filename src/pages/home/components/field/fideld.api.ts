import { AxiosResponse } from "axios";
import axiosInstance from "../../../../server/auth.api";
export type Poster = {
  url: string;
  _id: string;
};

export type FieldData = {
  _id: string;
  __v: number;
  posters: Poster[];
};

export type ApiResponse<T> = {
  data: T[];
  message: string;
  status: number;
};

export const fetchData = async <T>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(
    endpoint
  );
  return response.data;
};

export const getField = () => fetchData<FieldData>("/Poster");
