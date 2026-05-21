import { Request, Response } from "express";
import { CreatePrService } from "../../service/personal_record/CreatePrService";


class CreatePrController {
    async handle(req: Request, res: Response) {
        const { exercise_name, weight, reps, note } = req.body;
        const user_id = req.user_id;

        const service = new CreatePrService();
        const pr = await service.execute({ exercise_name, weight, reps, note, user_id });

        return res.json(pr);
    }
}

export { CreatePrController }