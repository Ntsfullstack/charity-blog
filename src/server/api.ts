import axiosInstance from "./auth.api";

export const searchBlog = async (query: string) => {
  try {
    const response = await axiosInstance.get("/search", {
      params: {
        query,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
