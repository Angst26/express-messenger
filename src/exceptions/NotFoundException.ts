import {HttpException} from "./HttpException.js";

export class NotFoundException extends HttpException {
    constructor( message: string, options?: ErrorOptions) {
        super(404, message, options);
    }
}