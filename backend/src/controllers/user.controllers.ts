import { Request, Response } from "express";
import prisma from "../../db/prisma";
import { BadRequestError } from "../errors/bad-request.error";
import { compare, genSalt, hash } from "bcryptjs"
import jwt from "jsonwebtoken"

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser)
        throw new BadRequestError("User not found");

    const isMatch = await compare(password, existingUser.password);
    if (!isMatch)
        throw new BadRequestError("Invalid credentials");

    const token = jwt.sign({ userId: existingUser.email }, process.env.JWT_SECRET!, { expiresIn: "1d" })
    if (!token)
        throw new Error("Internal server error");

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json([
        {
            message: "Logged in"
        }, {
            user: {
                email: existingUser.email,
                name: existingUser.name
            }
        }
    ]);
}

const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    console.log(email, password, name)

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
        throw new BadRequestError("Email already in use");

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    if (!hashedPassword)
        throw new Error("Internal server error");

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });
    if (!user)
        throw new BadRequestError("Failed to create user");

    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET!, { expiresIn: "1d" })
    if (!token)
        throw new Error("Internal server error");

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json([
        {
            message: "User created"
        }, {
            user: {
                email: user.email,
                name: user.name
            }
        }
    ]);
    return
}

const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json([{ message: "Logged out" }]);
    return
}

export { login, register, logout }