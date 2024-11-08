import { StatusCode } from "hono/utils/http-status";

class ErrorHandler extends Error {
    status: StatusCode;
    message: string;
    constructor(status: StatusCode, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = this.constructor.name;
    }
}

export default ErrorHandler;