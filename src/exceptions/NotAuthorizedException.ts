import {HttpException} from "./HttpException.js";

export class NotAuthorizedException extends HttpException {
    constructor(message: string, options?: ErrorOptions) {
        super(401, message, options);
    }
}