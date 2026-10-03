import { prisma } from "../../prisma/prisma";

interface UpdateExerciseLogRequest {
    id: string
    weight: number
    reps: number
}

class UpdateExerciseLogService {
    async execute({ id, weight, reps }: UpdateExerciseLogRequest) {
        if (!id) {
            throw new Error("Exercise log ID is required");
        }

        const exerciseLog = await prisma.exercises_logs.findFirst({
            where: { id, deleted_at: null },
        });

        if (!exerciseLog) {
            throw new Error("Exercise log not found");
        }

        return prisma.exercises_logs.update({
            where: { id },
            data: { weight, reps, completed: true },
        });
    }
}

export { UpdateExerciseLogService };
