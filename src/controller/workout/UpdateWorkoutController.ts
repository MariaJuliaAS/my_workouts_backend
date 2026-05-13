import { Request, Response } from "express";
import { UpdateWorkoutService } from "../../service/workout/UpdateWorkoutService";

class UpdateWorkoutController {
    async handle(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const { name } = req.body;
        const user_id = req.user_id;

        const service = new UpdateWorkoutService();
        const updated = await service.execute(id, user_id, { name });
        return res.json(updated);
    }
}

export { UpdateWorkoutController }
