"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    examType: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: String, required: true },
    explanation: { type: String },
}, { timestamps: true });
exports.Question = (0, mongoose_1.model)("Question", QuestionSchema);
