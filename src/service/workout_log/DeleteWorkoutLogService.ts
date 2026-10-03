import { prisma } from "../../prisma/prisma"

class DeleteWorkoutLogService {
    async execute(workout_log_id: string, user_id: string) {
        const workoutLog = await prisma.workout_logs.findFirst({
            where: {
                id: workout_log_id,
                deleted_at: null,
                workouts: { user_id },
            }
        })

        if (!workoutLog) {
            throw new Error("Workout log not found or already deleted");
        }

        await prisma.$transaction([
            prisma.exercises_logs.updateMany({
                where: { workout_logs_id: workout_log_id, deleted_at: null },
                data: { deleted_at: new Date() },
            }),
            prisma.workout_logs.update({
                where: { id: workout_log_id },
                data: { deleted_at: new Date() },
            }),
        ])

        return { message: "Log de treino deletado com sucesso" }
    }
}

export { DeleteWorkoutLogService }