"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateQuestionControllers_1 = require("../controllers/generateQuestionControllers");
const generateQuestionsRoute = (0, express_1.Router)();
generateQuestionsRoute.get('/', (req, res) => {
    res.send('Generate Questions route is working');
});
generateQuestionsRoute.post('/', async (req, res) => {
    await (0, generateQuestionControllers_1.generateQuestions)(req, res);
});
exports.default = generateQuestionsRoute;
