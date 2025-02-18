import { Router } from "express";
import { create, deleteOne, read, readOne, updateOne } from "../controllers/product.controllers";
import { auth } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/request-validator.middleware";
import { body, param } from "express-validator";

const productRouter = Router();

productRouter.post("/",
    auth,
    [
        body("name").isString().notEmpty(),
        body("price").isNumeric().notEmpty(),
        body("description").isString().notEmpty(),
    ],
    validateRequest,
    create
);

productRouter.get("/", auth, read);

productRouter.get("/:id", auth,
    [
        param("id").isUUID().notEmpty()
    ],
    validateRequest,
    readOne
);

productRouter.put("/:id", auth,
    [
        param("id").isUUID().notEmpty()
    ],
    validateRequest,
    updateOne
);

productRouter.delete("/:id", auth,
    [
        param("id").isUUID().notEmpty()
    ],
    validateRequest,
    deleteOne
);

export { productRouter }