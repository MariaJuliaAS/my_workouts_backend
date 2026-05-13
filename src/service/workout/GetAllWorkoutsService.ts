import { prisma } from "../../prisma/prisma";

class GetAllWorkoutsService {
    async execute(user_id: string) {
        if (!user_id) throw new Error("User ID is required");

        const workouts = await prisma.workouts.findMany({
            where: { 
                user: { id: user_id } 
            }
        });

        return workouts;
    }
}

export { GetAllWorkoutsService }
