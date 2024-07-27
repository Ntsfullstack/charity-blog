import { info } from "console";
import axiosInstance from "../../server/auth.api";



interface Client {
  name: string;
  email: string;
  phone: string;
  question: string;
}


interface ClientResponse {
status: number;
message: string;

}
export const postsClient = async (params:Client) => {
  try {
    const response = await axiosInstance.post<
    ClientResponse>(`/Client`, {
      params 
    });
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error; // Đảm bảo rằng lỗi được ném lại để xử lý ở mức cao hơn nếu cần
  }
};
