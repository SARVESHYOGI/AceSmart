import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { IAnswer, TestAttemptModel, TestModel } from "../models/Test.model";

export const submitTest = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { examType, score, answers, subject, topic } = req.body as {
      examType: string;
      score: number;
      answers: IAnswer[];
      subject: string;
      topic: string;
    };

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
      questionId: new Types.ObjectId(answer.questionId),
      selectedOption: answer.selectedOption,
      correct: answer.correct,
    }));

    const testAttempt = await TestAttemptModel.create({
      studentId: new Types.ObjectId(studentId),
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

  } catch (error) {
   console.error("Error submitting test:", error);
    return res.status(500).json({ 
      error: "An error occurred while submitting the test.",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
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

export const getTestById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    if (!id||!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Test ID is required.' });
    }

    const findtest = await TestModel.findById(id);

    if (!findtest) {
      return res.status(404).json({ error: 'Test not found.' });
    }

    return res.status(200).json({ testQuestions: findtest });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching the test.' });
  }
};