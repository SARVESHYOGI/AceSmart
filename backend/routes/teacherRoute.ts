import express,{Router} from 'express';

const teacherRoute = Router();

teacherRoute.post("/login", (req, res) => {
    // Handle login
});

teacherRoute.post("/register", (req, res) => {
    // Handle registration
});

export default teacherRoute;
