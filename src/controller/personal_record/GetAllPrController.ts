import { Request, Response } from "express";
import { GetAllPrService } from "../../service/personal_record/GetAllPrService";


class GetAllPrController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const service = new GetAllPrService();
        const prs = await service.execute(user_id);
        return res.json(prs);
    }
}

export { GetAllPrController }