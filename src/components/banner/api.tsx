import axiosInstance from "../../server/auth.api";
import { BannerData } from "./banner.type";

export const getBanner = async () => {
  try {
    const response = await axiosInstance.get<BannerData
    >("/getbanner");
    return response.data; // Access the images property correctly
  } catch (error) {
    console.error("Error fetching banner:", error);
    throw error; // Re-throw so the calling function can handle the error if needed
  }
};
