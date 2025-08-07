"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchstudentbyteacher = void 0;
const User_model_1 = require("../models/User.model");
const fetchstudentbyteacher = async (req, res) => {
    try {
        const data = await User_model_1.User.find({ role: "student" });
        res.status(200).json(data);
        return;
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchstudentbyteacher = fetchstudentbyteacher;
