import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  return res.status(201).json({
    message: result.message,
    token: result.token,
    user: result.user,
  });
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  return res.status(200).json({
    message: result.message,
    token: result.token,
    user: result.user,
  });
};
