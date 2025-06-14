import api from "./axiosInstance";
import { type User } from "../types/User";

export const registerUser=async(name:string,email:string,password:string,role:string):Promise<User>=>{
  const res = await api.post("/auth/register", { name, email, password, role });
  return res.data.user;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data.user;
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const logoutUser = async () => {
  await api.post("/auth/logout");
};
