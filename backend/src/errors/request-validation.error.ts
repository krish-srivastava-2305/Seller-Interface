import CustomError from "./custom.error";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: { message: string; field?: string }[]) {
        super("Invalid request parameters");

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors;
    }

}