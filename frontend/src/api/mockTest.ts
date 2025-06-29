import api from "./axiosInstance";

export const generateMockTest = async (data: { exam:string,subject: string,topic: string }) => {
  try {
    const response = await api.post("/generatequestions", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error in mockTest:", error);
    throw error;
  }
};

export type Test={
  testQuestions:TestData;
}
export type TestData={
  createdAt:string,
  examType:string,
  questions:Question[],
  subject:string,
  topic:string,
  _id:string
}
export type MCQOptionKey = "A" | "B" | "C" | "D";

export type Question={
  correctAnswer:string,
  createdAt:string,
  explanation:string,
  options: Record<MCQOptionKey, string>;
  question:string,
  _id:string
}

export const fetchTestByID=async(id:string): Promise<Test|undefined>=>{
  try {
    if(!id){
      throw new Error("id not given");
    }
    const res=await api.get(`/tests/gettestbyid/${id}`)
    console.log("res.data",res.data);
    return res.data;
  } catch (error) {
      console.log(error);
  }
}