import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {getUserById} from "../controllers/user.controller"

const router = Router();

router.get("/:id", asyncHandler(getUserById));

export default router;