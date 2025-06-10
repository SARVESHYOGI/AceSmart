import express,{Router} from 'express';

const generateQuestionsRoute = Router();

generateQuestionsRoute.post("/login", (req, res) => {
    // Handle login
    res.status(200).send("Login successful");
});

generateQuestionsRoute.post("/register", (req, res) => {
    // Handle registration
});

export default generateQuestionsRoute;
