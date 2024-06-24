import axiosInstance from "../server/auth.api";

export const getRelatedArticles = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/related-articles/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
