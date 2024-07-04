import axiosInstance from "../../server/auth.api";

export const postsClient = async (email: string) => {
  try {
    const response = await axiosInstance.post(`/Client`, {
      email: email,
    });
    return response;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error; // Đảm bảo rằng lỗi được ném lại để xử lý ở mức cao hơn nếu cần
  }
};
