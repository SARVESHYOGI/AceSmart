import express,{Router} from 'express';
import generate from '../config/aiprompt';
import { generateQuestions } from '../controllers/generateQuestionControllers';

const generateQuestionsRoute = Router();

generateQuestionsRoute.get('/', (req, res) => {
    res.send('Generate Questions route is working');
});
generateQuestionsRoute.post('/', async (req, res) => {
    await generateQuestions(req, res);
});
export default generateQuestionsRoute;
