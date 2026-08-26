import { Response, Request } from "express";
import * as userService from "../services/user.service";

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const user = await userService.getUserById(userId);

  return res.status(200).json({
    success: true,
    message: "User profile retrieved successfully",
    data: user,
  });
};
