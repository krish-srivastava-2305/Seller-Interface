import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized.error";
import { AutheticatedRequest } from "../types/IRequest";

const auth = async (req: AutheticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        throw new NotAuthorizedError();
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    if (!decodedToken) {
        throw new NotAuthorizedError();
    }
    req.user = decodedToken.email;
    next();
}

export { auth }