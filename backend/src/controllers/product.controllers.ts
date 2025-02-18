import { Response } from "express";
import { AutheticatedRequest } from "../types/IRequest";
import prisma from "../../db/prisma";
import { BadRequestError } from "../errors/bad-request.error";

const create = async (req: AutheticatedRequest, res: Response) => {
    const { name, price, description } = req.body;
    const email = req.user as string;

    const newProduct = await prisma.product.create({
        data: {
            name,
            price,
            description,
            user: {
                connect: {
                    email
                }
            }
        }
    });
    if (!newProduct)
        throw new BadRequestError("Product creation failed");

    res.status(201).json([
        {
            message: "Product created successfully",
            product: newProduct
        }
    ]);
}

const read = async (req: AutheticatedRequest, res: Response) => {
    const email = req.user as string;

    const products = await prisma.product.findMany({
        where: {
            user: {
                email
            }
        }
    });
    if (!products)
        throw new BadRequestError("No products found");

    res.json([
        {
            message: "Products fetched successfully",
            products
        }
    ]);
}

const readOne = async (req: AutheticatedRequest, res: Response) => {
    const email = req.user as string;
    const { id } = req.params;

    const product = await prisma.product.findFirst({
        where: {
            id,
            user: {
                email
            }
        }
    });
    if (!product)
        throw new BadRequestError("Product not found");

    res.json([
        {
            message: "Product fetched successfully",
            product
        }
    ]);
}

const updateOne = async (req: AutheticatedRequest, res: Response) => {
    const body = req.body;
    if (!body) throw new BadRequestError("No data provided");
    const email = req.user as string;
    const { id } = req.params;

    const product = await prisma.product.update({
        where: {
            id
        },
        data: {
            ...body
        }
    });
    if (!product)
        throw new BadRequestError("Product update failed");

    res.json([
        {
            message: "Product updated successfully",
            product
        }
    ]);
}

const deleteOne = async (req: AutheticatedRequest, res: Response) => {
    const email = req.user as string;
    const { id } = req.params;

    const product = await prisma.product.delete({
        where: {
            id
        }
    });
    if (!product)
        throw new BadRequestError("Product deletion failed");

    res.json([
        {
            message: "Product deleted successfully"
        }
    ]);
}

export {
    create,
    read,
    readOne,
    updateOne,
    deleteOne
}