import { User } from "../models/User.model";
import { Request, Response } from "express";

export const fetchstudentbyteacher=async(req:Request,res:Response)=>{
    try {
        const data=await User.find({role:"student"})
        res.status(200).json(data);
        return;
    } catch (error) {
        console.log(error);
    }
}