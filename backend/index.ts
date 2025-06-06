import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

connectDB();
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on  port http://localhost:${process.env.PORT}`);
});