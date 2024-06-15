import axiosInstance from "../../server/auth.api";

export const getBanner = async () => {
  try {
    const response = await axiosInstance.get("/getbanner");
    return response[0].images; // Access the images property correctly
  } catch (error) {
    console.error("Error fetching banner:", error);
    throw error; // Re-throw so the calling function can handle the error if needed
  }
};
