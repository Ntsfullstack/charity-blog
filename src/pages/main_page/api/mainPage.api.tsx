import { BlogResponse } from "../../auth/types/types";
import axiosInstance from "../../../server/auth.api";

export async function getCategoryPosts(
  categoryId: string,
  featured: boolean,
  page: number,
  limit: number
){
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axiosInstance.get<BlogResponse>(`/getCategoryPosts/${categoryId}`, {
      params: {
        featured,
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}
