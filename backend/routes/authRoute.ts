import express, { Request, Response } from 'express';
import { loginRoute, registerRoute, selfRoute, logoutRoute } from '../controllers/authControllers';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.send('Auth route is working');
});

router.post('/login', async (req: Request, res: Response) => {
	await loginRoute(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
	await registerRoute(req, res);
});
router.post('/logout', verifyToken, async (req: Request, res: Response) => {
  await logoutRoute(req, res);
});
router.get('/me', verifyToken, async (req: Request, res: Response) => {
  await selfRoute(req, res);
});

export default router;
