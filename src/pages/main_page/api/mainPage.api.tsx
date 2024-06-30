import { AxiosResponse } from "axios";
import { BlogResponse } from "../../auth/types/types";
import axiosInstance from "../../../server/auth.api";

export async function getListBlogMore(
  params: number
): Promise<AxiosResponse<BlogResponse>> {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axiosInstance.get<BlogResponse>(`/Posts`, {
      params: {
        limit: params,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}
