import { Request, Response } from "express";
import { GetWorkoutByIdService } from "../../service/workout/GetWorkoutByIdService";

class GetWorkoutController {
    async handle(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const user_id = req.user_id;

        const service = new GetWorkoutByIdService();
        const workout = await service.execute(id, user_id);

        return res.json(workout);
    }
}

export { GetWorkoutController }
