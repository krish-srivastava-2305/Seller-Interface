import { Request } from "express";

interface IRequest extends Request {
    user?: string;
}
export type AutheticatedRequest = IRequest;