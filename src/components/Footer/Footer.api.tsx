import { info } from "console";
import axiosInstance from "../../server/auth.api";

export const postsClient = async (name: string, phone: string, email: string, information: string) => {
  try {
    const response = await axiosInstance.post(`/Client`, {
      name: name,
      phone: phone,
      email: email,
      information: information,
    });
    return response;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error; // Đảm bảo rằng lỗi được ném lại để xử lý ở mức cao hơn nếu cần
  }
};
