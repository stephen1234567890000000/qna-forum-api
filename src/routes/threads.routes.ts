import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createThread,
  getAllThreads,
  getMyThreads,
  getThreadById,
  updateThread,
  deleteThread,
} from "../controllers/thread.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createThreadSchema,
  updateThreadSchema,
} from "../validators/thread.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createThreadSchema),
  asyncHandler(createThread),
);
router.get("/", asyncHandler(getAllThreads));
router.get("/myThreads", authenticate, asyncHandler(getMyThreads));

router.get("/:id", asyncHandler(getThreadById));
router.put(
  "/:id",
  authenticate,
  validate(updateThreadSchema),
  asyncHandler(updateThread),
);
router.delete("/:id", authenticate, asyncHandler(deleteThread));

export default router;
