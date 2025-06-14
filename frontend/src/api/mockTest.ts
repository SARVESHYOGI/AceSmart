import api from "./axiosInstance";

export const generateMockTest = async (data: { exam:string,subject: string,topic: string }) => {
  try {
    const response = await api.post("/generatequestions", data);
    return response.data;
  } catch (error) {
    console.error("Error in mockTest:", error);
    throw error;
  }
};