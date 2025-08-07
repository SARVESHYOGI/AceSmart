"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parentRoute = (0, express_1.Router)();
parentRoute.post("/login", (req, res) => {
    // Handle login
});
parentRoute.post("/register", (req, res) => {
    // Handle registration
});
exports.default = parentRoute;
