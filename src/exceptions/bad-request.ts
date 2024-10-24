import { ErrorCodes, HttpException } from ".";

export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, errorCode, 400, null)
    }
}