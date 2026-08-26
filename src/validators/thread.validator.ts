import { z } from "zod";

export const createThreadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),

  content: z.string().trim().min(1, "Content is required"),
});

export const updateThreadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters"),

  content: z.string().trim().min(1, "Content is required"),
});
