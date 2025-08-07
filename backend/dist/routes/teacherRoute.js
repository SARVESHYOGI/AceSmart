"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentControllers_1 = require("../controllers/studentControllers");
const teacherRoute = (0, express_1.Router)();
teacherRoute.post("/login", (req, res) => {
    // Handle login
});
teacherRoute.post("/register", (req, res) => {
    // Handle registration
});
teacherRoute.get('/getstudent', studentControllers_1.fetchstudentbyteacher);
exports.default = teacherRoute;
