"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const testRoute_1 = __importDefault(require("./routes/testRoute"));
const teacherRoute_1 = __importDefault(require("./routes/teacherRoute"));
const parentRoute_1 = __importDefault(require("./routes/parentRoute"));
const generateQuestionsRoute_1 = __importDefault(require("./routes/generateQuestionsRoute"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    // origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", authRoute_1.default);
app.use("/api/tests", testRoute_1.default);
app.use("/api/teacher/", teacherRoute_1.default);
app.use("/api/parent/child", parentRoute_1.default);
app.use("/api/generatequestions", generateQuestionsRoute_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
