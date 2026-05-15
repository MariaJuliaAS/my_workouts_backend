import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { rateLimiter } from "./middleware/rateLimiter";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { DetailUserController } from "./controller/user/DetailUserController";
import { CreateWorkoutController } from "./controller/workout/CreateWorkoutController";
import { GetAllWorkoutsController } from "./controller/workout/GetAllWorkoutsController";
import { GetWorkoutController } from "./controller/workout/GetWorkoutController";
import { UpdateWorkoutController } from "./controller/workout/UpdateWorkoutController";
import { DeleteWorkoutController } from "./controller/workout/DeleteWorkoutController";
import { StartWorkoutLogController } from "./controller/workout_log/StartWorkoutLogController";

const router = Router();

router.post("/user", new CreateUserController().handle)
router.post("/user/auth", rateLimiter, new AuthUserController().handle)
router.get("/user/detail", isAuthenticated, new DetailUserController().handle)

router.post("/workout", isAuthenticated, new CreateWorkoutController().handle)
router.get("/workout", isAuthenticated, new GetAllWorkoutsController().handle)
router.get("/workout/:id", isAuthenticated, new GetWorkoutController().handle)
router.put("/workout/:id", isAuthenticated, new UpdateWorkoutController().handle)
router.delete("/workout/:id", isAuthenticated, new DeleteWorkoutController().handle)

router.post("/workout_log/start/:workout_id", isAuthenticated, new StartWorkoutLogController().handle)

export { router };