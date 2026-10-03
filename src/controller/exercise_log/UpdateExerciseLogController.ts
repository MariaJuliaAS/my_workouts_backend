import { Request, Response } from "express";
import { UpdateExerciseLogService } from "../../service/exercise_log/UpdateExerciseLogService";

class UpdateExerciseLogController {
    async handle(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const { weight, reps } = req.body as { weight: number; reps: number };

        const service = new UpdateExerciseLogService();
        const exerciseLog = await service.execute({ id, weight, reps });

        return res.json(exerciseLog);
    }
}

export { UpdateExerciseLogController };
