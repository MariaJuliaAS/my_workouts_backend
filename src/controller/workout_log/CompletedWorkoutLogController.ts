import { Request, Response } from "express";
import { CompletedWorkoutLogService } from "../../service/workout_log/CompletedWorkoutLogService";


class CompletedWorkoutLogController{
    async handle(req: Request, res: Response){
        const { workoutLog_id } = req.params as { workoutLog_id: string };

        const service = new CompletedWorkoutLogService();
        const workout_log = await service.execute(workoutLog_id);

        return res.json(workout_log);
    }
}

export { CompletedWorkoutLogController }