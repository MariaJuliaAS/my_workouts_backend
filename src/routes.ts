import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { rateLimiter } from "./middleware/rateLimiter";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { DetailUserController } from "./controller/user/DetailUserController";

const router = Router();

router.post("/user", new CreateUserController().handle)
router.post("/user/auth", rateLimiter, new AuthUserController().handle)
router.get("/user/detail", isAuthenticated, new DetailUserController().handle)

export { router };