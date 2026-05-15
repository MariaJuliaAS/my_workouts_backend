import { prisma } from "../../prisma/prisma";

class StartWorkoutLogService{
    async execute(workout_id: string){
        if(!workout_id){
            throw new Error("Workout ID is required");
        }

        const workout_log = await prisma.workout_logs.create({
            data:{
                started_at: new Date(),
                completed_at: null,
                workouts: {
                    connect: {id: workout_id}
                }
            }
        })
        return workout_log;
    }
}

export { StartWorkoutLogService }