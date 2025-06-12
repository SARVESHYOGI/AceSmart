import { Request, Response } from "express";
import { Types } from "mongoose";
import { IAnswer, TestAttemptModel } from "../models/Test.model";

export const submitTest = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { examType, score, answers } = req.body as {
      examType: string;
      score: number;
      answers: IAnswer[];
    };

    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ error: "Student not authenticated" });
    }

    if (!answers || answers.length === 0) {
      return res.status(400).json({ error: "No answers provided" });
    }

    const formattedAnswers = answers.map((answer) => ({
      questionId: new Types.ObjectId(answer.questionId),
      selectedOption: answer.selectedOption,
      correct: answer.correct,
    }));

    const testAttempt = await TestAttemptModel.create({
      studentId: new Types.ObjectId(studentId),
      examType,
      score,
      answers: formattedAnswers,
    });

    return res.status(201).json({
      message: "Test submitted successfully",
      testAttempt,
    });

  } catch (error) {
    console.error("Error submitting test:", error);
    return res.status(500).json({ error: "An error occurred while submitting the test." });
  }
};


export const getTestAttempts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ error: "Student not authenticated" });
    }

    const testAttempts = await TestAttemptModel.find({ studentId: new Types.ObjectId(studentId) })
      .populate('answers.questionId', 'questionText options')
      .sort({ createdAt: -1 });

    return res.status(200).json(testAttempts);
  } catch (error) {
    console.error("Error fetching test attempts:", error);
    return res.status(500).json({ error: "An error occurred while fetching test attempts." });
  }
}
