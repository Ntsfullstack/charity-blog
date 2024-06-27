import axiosInstance from "../../../server/auth.api";

export const getPostsByCategories = async (categories: string) => {
  try {
    const response = await axiosInstance.get(
      `/getPostsByCategories/${categories}`
    );
    return response;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};
