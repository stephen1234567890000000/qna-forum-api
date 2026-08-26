import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", login, validate(loginSchema), asyncHandler(login));

export default router;
