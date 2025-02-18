import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
    res.status(201).json({ message: "Create product" });
}

const read = async (req: Request, res: Response) => {

}

const readOne = async (req: Request, res: Response) => {

}

const updateOne = async (req: Request, res: Response) => {

}

const deleteOne = async (req: Request, res: Response) => {

}

export {
    create,
    read,
    readOne,
    updateOne,
    deleteOne
}