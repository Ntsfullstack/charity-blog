import { BlogResponse, BlogData } from "../../auth/types/types";
import axiosInstance from "../../../server/auth.api";
import { BlogPostData } from "../types/blogdata.type";

export async function getCategoryPosts(
  categoryId: string,
  featured?: boolean,
  page?: number,
  limit?: number
): Promise<BlogResponse> {
  try {
    const token = localStorage.getItem("token");
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