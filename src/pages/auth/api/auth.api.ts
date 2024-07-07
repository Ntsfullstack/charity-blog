import { AxiosResponse } from "axios";
import axiosInstance from "../../../server/auth.api";
import { BlogResponse, PaginatedResponse } from "../types/types";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken)?.token : null;

export const getInfoUser = async (params: string) => {
  try {
    const response = await axiosInstance.get(`/synthetic/users/${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.message);
  } finally {
    console.log("Finally");
  }
};

export const deleteUsers = async (params: any) => {
  try {
    const response = await axiosInstance.delete(`/auth/Client/${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    console.error("Login Error:", error.message);
  }
};

export async function getListUsers(
  params: string
): Promise<AxiosResponse<any>> {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axiosInstance.get<any>(`/auth/users?${params}`, {
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

export async function getListBlogs(
  params: string
): Promise<AxiosResponse<BlogResponse>> {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axiosInstance.get<BlogResponse>(`/Post?${params}`, {
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
export const getBlog = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};
export const updatePost = async (params: any) => {
  const { slug } = params; // Extract slug from params
  try {
    const response = await axiosInstance.put(`/auth/Post/${slug}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về dữ liệu từ phản hồi (response.data)
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error; // Ném lỗi để xử lý ở phần gọi hàm updatePost
  }
};
export const deletePost = async (slug: string) => {
  try {
    const response = await axiosInstance.delete("/auth/Post/" + slug);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async (data: any) => {
  try {
    const response = await axiosInstance.post("/auth/Post", data);
    return response;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};

export const updateBanner = async (data: any) => {
  try {
    const response = await axiosInstance.put("/updatebanner", data);
    return response;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};
export const getTagCategory = async () => {
  try {
    const response = await axiosInstance.get("/getCategories");
    return response;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};

export const getAllImageInAlbum = async (
  page: number,
  pageSize: number
): Promise<AxiosResponse<PaginatedResponse>> => {
  try {
    const response: AxiosResponse<PaginatedResponse> = await axiosInstance.get(
      `Album`,
      {
        params: {
          page,
          limit: pageSize, // Use 'limit' to match backend's query parameter
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy ảnh:", error);
    throw error;
  }
};
export const deleteImageInAlbum = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`auth/Album/${id}`);
    return response;
  } catch (error) {
    console.error("Lỗi khi xóa ảnh:", error);
    throw error;
  }
};
