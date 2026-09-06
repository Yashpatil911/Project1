import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
let port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.listen(port, () => {
    connectDb();
  console.log(`Server is running on port ${port}`);
});

