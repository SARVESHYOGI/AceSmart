import express, { Request, Response } from 'express';
import { loginRoute, registerRoute } from '../controllers/authControllers';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
	await loginRoute(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
	await registerRoute(req, res);
});

export default router;
