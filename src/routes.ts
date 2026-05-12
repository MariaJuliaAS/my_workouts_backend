import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { rateLimiter } from "./middleware/rateLimiter";

const router = Router();

router.post("/user", new CreateUserController().handle)
router.post("/user/auth", rateLimiter, new AuthUserController().handle)

export { router };