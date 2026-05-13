import { prisma } from "../../prisma/prisma";

class CreateWorkoutService {
    async execute(user_id: string, name: string) {
        if (!user_id) throw new Error("User ID is required");
        if (!name) throw new Error("Workout name is required");

        const workout = await prisma.workouts.create({
            data: { 
                name, 
                user_id 
            }
        });

        return workout;
    }
}

export { CreateWorkoutService }
