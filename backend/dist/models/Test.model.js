"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = exports.TestAttemptModel = void 0;
const mongoose_1 = require("mongoose");
const MCQSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    options: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        D: { type: String, required: true },
    },
    correctAnswer: { type: String, enum: ["A", "B", "C", "D"], required: true },
    explanation: { type: String, default: "" },
}, { timestamps: true });
const AnswerSchema = new mongoose_1.Schema({
    questionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedOption: { type: String, required: true },
    correct: { type: Boolean, required: true },
});
const TestAttemptSchema = new mongoose_1.Schema({
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    examType: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    score: { type: Number, required: true },
    answers: { type: [AnswerSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});
const TestSchema = new mongoose_1.Schema({
    examType: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    questions: { type: [MCQSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.TestAttemptModel = (0, mongoose_1.model)('TestAttempt', TestAttemptSchema);
exports.TestModel = (0, mongoose_1.model)('Test', TestSchema);
