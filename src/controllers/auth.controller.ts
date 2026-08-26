import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json({
      message: result.message,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};
