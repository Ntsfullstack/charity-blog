import axiosInstance from "../../../server/auth.api";
import { LoginParams } from "../types/type";

export async function Login(params: LoginParams): Promise<any> {
  try {
    const response = await axiosInstance.post("users/login", {
      // Use axiosInstance.post directly
      username: params.username,
      password: params.password,
    });
      return response
  } catch (error: any) {
    // Log the error for debugging
    console.error("Login Error:", error.message);

    throw error;
  }
}
