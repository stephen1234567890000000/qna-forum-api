import { Response, Request } from "express";
import * as threadService from "../services/thread.service";

export const createThread = async (req: Request, res: Response) => {
  const result = await threadService.createThread(
    req.body,
    req.user!.id as string,
  );

  return res.status(201).json({
    success: true,
    message: "Thread created successfully",
    data: result,
  });
};

export const getAllThreads = async (_req: Request, res: Response) => {
  const result = await threadService.getAllThreads();

  return res.status(200).json({
    success: true,
    message: "Threads retrieved successfully",
    data: result,
  });
};

export const getMyThreads = async (req: Request, res: Response) => {
  const result = await threadService.getMyThreads(req.user!.id as string);

  return res.status(200).json({
    success: true,
    message: "My threads retrieved successfully",
    data: result,
  });
};

export const getThreadById = async (req: Request, res: Response) => {
  const result = await threadService.getThreadById(req.params.id as string);

  return res.status(200).json({
    success: true,
    message: "Thread retrieved successfully",
    data: result,
  });
};

export const updateThread = async (req: Request, res: Response) => {
  const result = await threadService.updateThread(
    req.params.id as string,
    req.user!.id as string,
    req.body,
  );

  return res.status(200).json({
    success: true,
    message: "Thread updated successfully",
    data: result,
  });
};

export const deleteThread = async (req: Request, res: Response) => {
  await threadService.deleteThread(
    req.params.id as string,
    req.user!.id as string,
  );

  return res.status(200).json({
    success: true,
    message: "Thread deleted successfully",
  });
};
