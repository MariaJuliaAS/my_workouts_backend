import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";

const router = Router();

router.post("/user", new CreateUserController().handle)
router.post("/user/auth", new AuthUserController().handle)

export { router };