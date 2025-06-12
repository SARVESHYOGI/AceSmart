import express, { Router, Request, Response } from 'express';
import { getTestAttempts, submitTest } from '../controllers/testControllers';
import { requireRole, verifyToken } from '../middleware/auth.middleware';

const testRoute = Router();

testRoute.post('/submitTest', verifyToken, requireRole(['student']), async (req: Request, res: Response) => {
  await submitTest(req, res);
});

testRoute.get('/getTestAttempts', verifyToken, requireRole(['student']), async (req: Request, res: Response) => {
  await getTestAttempts(req, res);
});

export default testRoute;
