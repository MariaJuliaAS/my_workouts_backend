import { Request, Response } from "express";
import { DeletePrService } from "../../service/personal_record/DeletePrService";

class DeletePrController {
    async handle(req: Request, res: Response) {
        const { pr_id } = req.params as { pr_id: string };

        const service = new DeletePrService();
        const pr = await service.execute(pr_id);

        return res.json(pr);

    }
}

export { DeletePrController }