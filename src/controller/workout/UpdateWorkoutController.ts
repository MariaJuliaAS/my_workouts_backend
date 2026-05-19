import { Request, Response } from "express";
import { UpdateWorkoutService } from "../../service/workout/UpdateWorkoutService";

class UpdateWorkoutController {
    async handle(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const { name, exercises } = req.body;

        const service = new UpdateWorkoutService();
        const updated = await service.execute({
            name,
            workout_id: id,
            exercises,
        });
        return res.json(updated);
    }
}

export { UpdateWorkoutController }
