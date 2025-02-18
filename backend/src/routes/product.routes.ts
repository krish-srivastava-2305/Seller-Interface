import { Router } from "express";
import { create, deleteOne, read, readOne, updateOne } from "../controllers/product.controllers";

const productRouter = Router();

productRouter.get("/", create);

productRouter.post("/", read);

productRouter.get("/:id", readOne);

productRouter.put("/:id", updateOne);

productRouter.delete("/:id", deleteOne);

export { productRouter }