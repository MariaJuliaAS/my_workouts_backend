import { prisma } from "../../prisma/prisma";

class UpdateWorkoutService {
    async execute(workout_id: string, user_id: string, data: { name?: string }) {
        if (!workout_id) throw new Error("Workout ID is required");
        if (!user_id) throw new Error("User ID is required");

        const workout = await prisma.workouts.findFirst({
            where: { 
                id: workout_id, 
                user: { id: user_id } 
            }
        });
        if (!workout) throw new Error("Workout not found or not owned by user");

        const updated = await prisma.workouts.update({
            where: { id: workout_id },
            data: { name: data.name ?? workout.name }
        });

        return updated;
    }
}

export { UpdateWorkoutService }
