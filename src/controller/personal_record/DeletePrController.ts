import { Request, Response } from "express";
import { DeletePrService } from "../../service/personal_record/DeletePrService";

class DeletePrController {
    async handle(req: Request, res: Response) {
        const { id } = req.params as { id: string };

        const service = new DeletePrService();
        const pr = await service.execute(id);

        return res.json(pr);

    }
}

export { DeletePrController }