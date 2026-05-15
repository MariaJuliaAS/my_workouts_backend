import { prisma } from "../../prisma/prisma";


class CompletedWorkoutLogService{
    async execute(workoutLog_id: string){
        if(!workoutLog_id){
            throw new Error("Workout Log ID is required");
        }

        const log = await prisma.workout_logs.findFirst({
            where: {
                id: workoutLog_id,
            }
        })
        if(!log){
            throw new Error("Workout log not found");
        }

        const workout_log = await prisma.workout_logs.update({
            where: {
                id: log.id
            },
            data: {
                completed_at: new Date()
            }
        })

        return workout_log;
    }
}

export { CompletedWorkoutLogService }