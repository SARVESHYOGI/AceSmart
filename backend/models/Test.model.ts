import { Schema, model, Document, Types } from "mongoose";

interface IAnswer {
    questionId: Types.ObjectId;
    selectedOption: string;
    correct: boolean;
}
  
export interface ITestAttempt extends Document {
    studentId: Types.ObjectId;
    examType: string;
    score: number;
    answers: IAnswer[];
    createdAt: Date;
}
  
const AnswerSchema = new Schema<IAnswer>({
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: String, required: true },
    correct: { type: Boolean, required: true },
});
  
const TestAttemptSchema = new Schema<ITestAttempt>({
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    examType: { type: String, required: true },
    score: { type: Number, required: true },
    answers: { type: [AnswerSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});
  
export const TestAttemptModel = model<ITestAttempt>('TestAttempt', TestAttemptSchema);
  