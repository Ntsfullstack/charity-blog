import axiosInstance from "../../../server/auth.api";

export const getPostsByCategories = async (categories: string) => {
  try {
    const response = await axiosInstance.get(`/getCategoryPosts/${categories}`);
    return response.data;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};
export const getPostsByFeatured = async (featured: string) => {
  try {
    const response = await axiosInstance.get(
      `/getFeaturedBlogPost/${featured}`
    );
    return response.data;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/getCategories`);
    return response.data;
  } catch (error: any) {
    console.error(" Error:", error.message);
  }
};
