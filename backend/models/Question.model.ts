import { Schema, model, Document, Types } from "mongoose";
 export interface IQuestion extends Document {
    examType: string;
    subject: string;
    topic: string;
    question: string;
    options: string[];
    answer: string;
    createdAt: Date;
    updatedAt: Date;
    explanation?: string;
}

const QuestionSchema = new Schema<IQuestion>({
    examType: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    explanation: { type: String },
 },{timestamps:true})

 export const Question=model<IQuestion>("Question",QuestionSchema);