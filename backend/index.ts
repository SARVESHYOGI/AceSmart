import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute";
import testRoute from "./routes/testRoute";
import teacherRoute from "./routes/teacherRoute";
import parentRoute from "./routes/parentRoute";
import generateQuestionsRoute from "./routes/generateQuestionsRoute";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoute);
app.use("/api/tests", testRoute);
app.use("/api/teacher/batch", teacherRoute);
app.use("/api/parent/child", parentRoute);
app.use("/api/generatequestions", generateQuestionsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
