import express,{Router} from 'express';
import { fetchstudentbyteacher } from '../controllers/studentControllers';

const teacherRoute = Router();

teacherRoute.post("/login", (req, res) => {
    // Handle login
});

teacherRoute.post("/register", (req, res) => {
    // Handle registration
});

teacherRoute.get('/getstudent',fetchstudentbyteacher)

export default teacherRoute;
