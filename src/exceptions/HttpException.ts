export class HttpException extends Error {
    constructor(public statusCode: number, public message: string, options?: ErrorOptions) {
        super(message, options);
    }
}