// message, status, code
export class HttpException extends Error {
  message: string;
  errorCode: ErrorCodes;
  statusCode: number;
  error: any;

  constructor(message: string, errorCode: ErrorCodes, statusCode: number, error: any) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 20001,
    INTERNAL_EXCEPTION = 3001,
}