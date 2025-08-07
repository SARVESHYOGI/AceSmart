"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentgivenTests = exports.getTestById = exports.getTestAttempts = exports.submitTest = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Test_model_1 = require("../models/Test.model");
const submitTest = async (req, res) => {
    try {
        const { examType, score, answers, subject, topic } = req.body;
        const studentId = req.user?.id;
        if (!studentId) {
            return res.status(401).json({ error: "Student not authenticated" });
        }
        if (!answers || answers.length === 0) {
            return res.status(400).json({ error: "No answers provided" });
        }
        if (!examType || !subject || !topic) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (typeof score !== 'number') {
            return res.status(400).json({ error: "Invalid score format" });
        }
        const formattedAnswers = answers.map((answer) => ({
            questionId: new mongoose_1.Types.ObjectId(answer.questionId),
            selectedOption: answer.selectedOption,
            correct: answer.correct,
        }));
        const testAttempt = await Test_model_1.TestAttemptModel.create({
            studentId: new mongoose_1.Types.ObjectId(studentId),
            examType,
            subject,
            topic,
            score,
            answers: formattedAnswers,
        });
        return res.status(201).json({
            message: "Test submitted successfully",
            testAttempt,
        });
    }
    catch (error) {
        console.error("Error submitting test:", error);
        return res.status(500).json({
            error: "An error occurred while submitting the test.",
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.submitTest = submitTest;
const getTestAttempts = async (req, res) => {
    try {
        const studentId = req.user?.id;
        if (!studentId) {
            return res.status(401).json({ error: "Student not authenticated" });
        }
        const testAttempts = await Test_model_1.TestAttemptModel.find({ studentId: new mongoose_1.Types.ObjectId(studentId) })
            .populate('answers.questionId', 'questionText options')
            .sort({ createdAt: -1 });
        return res.status(200).json(testAttempts);
    }
    catch (error) {
        console.error("Error fetching test attempts:", error);
        return res.status(500).json({ error: "An error occurred while fetching test attempts." });
    }
};
exports.getTestAttempts = getTestAttempts;
const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Test ID is required.' });
        }
        const findtest = await Test_model_1.TestModel.findById(id);
        if (!findtest) {
            return res.status(404).json({ error: 'Test not found.' });
        }
        return res.status(200).json({ testQuestions: findtest });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the test.' });
    }
};
exports.getTestById = getTestById;
const studentgivenTests = async (req, res) => {
    try {
        const studentId = req.user?.id;
        if (!studentId) {
            return res.status(401).json({ error: "Student not authenticated" });
        }
        const tests = await Test_model_1.TestAttemptModel.find({ studentId: new mongoose_1.Types.ObjectId(studentId) })
            .sort({ createdAt: -1 });
        console.log(tests);
        return res.status(200).json(tests);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get student given tests' });
    }
};
exports.studentgivenTests = studentgivenTests;
