import { Schema, model, Document, Types } from "mongoose";

export interface IAnswer {
    questionId: Types.ObjectId;
    selectedOption: string;
    correct: boolean;
}

export type MCQOptionKey = "A" | "B" | "C" | "D";

export interface MCQ {
  question: string;
  options: Record<MCQOptionKey, string>;
  correctAnswer: MCQOptionKey;
  explanation: string;
}
export interface ITestAttempt extends Document {
    studentId: Types.ObjectId;
    subject: string;
    topic: string;
    examType: string;
    score: number;
    answers: IAnswer[];
    createdAt: Date;
}
export interface ITest extends Document {
    examType: string;
    subject: string;
    topic: string;
    questions: MCQ[];
    createdAt: Date;
}

const MCQSchema = new Schema<MCQ>({
    question: { type: String, required: true },
    options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true },
    },
    correctAnswer: { type: String, enum: ["A", "B", "C", "D"], required: true },
    explanation: { type: String, default: "" },
},{timestamps: true});

const AnswerSchema = new Schema<IAnswer>({
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: String, required: true },
    correct: { type: Boolean, required: true },
});
  
const TestAttemptSchema = new Schema<ITestAttempt>({
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    examType: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    score: { type: Number, required: true },
    answers: { type: [AnswerSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});

const TestSchema=new Schema<ITest>({
    examType: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    questions: { type: [MCQSchema], required: true },
    createdAt: { type: Date, default: Date.now },
})
    

export const TestAttemptModel = model<ITestAttempt>('TestAttempt', TestAttemptSchema);
export const TestModel = model<ITest>('Test', TestSchema);