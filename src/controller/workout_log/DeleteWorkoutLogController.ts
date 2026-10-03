import { Request, Response } from "express";
import { DeleteWorkoutLogService } from "../../service/workout_log/DeleteWorkoutLogService";

class DeleteWorkoutLogController {
    async handle(req: Request, res: Response) {
        const { id } = req.params as { id: string }
        const user_id = req.user_id

        const service = new DeleteWorkoutLogService()

        try {
            const result = await service.execute(id, user_id)
            return res.json(result)
        } catch (err: any) {
            return res.status(404).json({ error: err.message })
        }
    }
}

export { DeleteWorkoutLogController }