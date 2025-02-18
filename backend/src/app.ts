import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "express-async-errors";
import { NotFoundError } from "./errors/not-found.error";
import { errorHandler } from "./middlewares/error-handler.middleware";

// Create express app
const app = express();
dotenv.config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())




// handle invalid routes
app.all("*", () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export default app;

