import { Request, Response } from "express";
import { StartWorkoutLogService } from "../../service/workout_log/StartWorkoutLogService"; 

class StartWorkoutLogController{
    async handle(req: Request, res: Response){
        const { workout_id } = req.params as { workout_id: string };

        const service = new StartWorkoutLogService();
        const workout_log = await service.execute(workout_id);
        
        return res.json(workout_log);
    }
}

export { StartWorkoutLogController }