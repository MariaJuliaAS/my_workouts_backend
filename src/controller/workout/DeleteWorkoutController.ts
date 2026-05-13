import { Request, Response } from "express";
import { DeleteWorkoutService } from "../../service/workout/DeleteWorkoutService";

class DeleteWorkoutController {
    async handle(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const user_id = req.user_id;

        const service = new DeleteWorkoutService();
        const result = await service.execute(id, user_id);
        return res.json(result);
    }
}

export { DeleteWorkoutController }
