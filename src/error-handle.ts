import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "./exceptions";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandle = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exceptions: HttpException;
      if (error instanceof HttpException) {
        exceptions = error;
      } else {
        exceptions = new InternalException(
          "Something went wrong !!",
          error,
          ErrorCodes.INTERNAL_EXCEPTION
        );
      }
      next(exceptions);
    }
  };
};
