import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "express-async-errors";
import { NotFoundError } from "./errors/not-found.error";
import { errorHandler } from "./middlewares/error-handler.middleware";
import prisma from "../db/prisma";
import cookieParser from "cookie-parser";

// Create express app
const app = express();
dotenv.config();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Routes
import { userRouter } from "./routes/user.routes";
import { productRouter } from "./routes/product.routes";

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// handle invalid routes
app.all("*", () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;

