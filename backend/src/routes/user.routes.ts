import { Router } from "express";
import { login, logout, register } from "../controllers/user.controllers";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/request-validator.middleware";
import { auth } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/login",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().notEmpty().withMessage("Password is required")
    ],
    validateRequest,
    login
);

userRouter.post("/register",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters"),
        body("name").not().isEmpty().withMessage("Name is required")
    ],
    validateRequest,
    register
);

userRouter.get("/logout", auth, logout);

export { userRouter }