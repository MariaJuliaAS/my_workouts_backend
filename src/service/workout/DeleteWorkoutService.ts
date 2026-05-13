import { prisma } from "../../prisma/prisma";

class DeleteWorkoutService {
    async execute(workout_id: string, user_id: string) {
        if (!workout_id) throw new Error("Workout ID is required");
        if (!user_id) throw new Error("User ID is required");

        const workout = await prisma.workouts.findFirst({
            where: { 
                id: workout_id, 
                user: { id: user_id } 
            }
        });

        if (!workout) throw new Error("Workout not found or not owned by user");

        await prisma.workouts.delete({ 
            where: { id: workout_id } 
        });

        return { 
            message: "Workout '" + workout.name + "' deleted",
         };
    }
}

export { DeleteWorkoutService }
