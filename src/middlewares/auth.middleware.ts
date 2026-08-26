import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/appError";

interface JwtPayload {
  userId: string;
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new AppError("Authentication required", 401));
  }

  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new AppError("Invalid authorization header", 401));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    new AppError("Invalid or expired token", 401);
  }
};
