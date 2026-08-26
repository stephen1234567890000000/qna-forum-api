import { NextFunction, Request, Response } from "express";

export const asyncHandler = (
  controller: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};
