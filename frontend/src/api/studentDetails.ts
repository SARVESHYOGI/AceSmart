import api from "./axiosInstance";
export const fetchTests=async()=>{
const res = await api.get('/tests/studenttests')
console.log("res",res);
  return res.data
}