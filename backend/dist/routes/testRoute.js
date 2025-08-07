"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testControllers_1 = require("../controllers/testControllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const testRoute = (0, express_1.Router)();
testRoute.post('/submitTest', auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(['student']), async (req, res) => {
    await (0, testControllers_1.submitTest)(req, res);
});
testRoute.get('/getTestAttempts', auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(['student']), async (req, res) => {
    await (0, testControllers_1.getTestAttempts)(req, res);
});
testRoute.get('/gettestbyid/:id', auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(['student']), async (req, res) => {
    await (0, testControllers_1.getTestById)(req, res);
});
testRoute.get('/studenttests', auth_middleware_1.verifyToken, (0, auth_middleware_1.requireRole)(['student']), async (req, res) => {
    await (0, testControllers_1.studentgivenTests)(req, res);
});
exports.default = testRoute;
