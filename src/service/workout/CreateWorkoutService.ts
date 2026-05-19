import { prisma } from "../../prisma/prisma";

interface ExerciseInput {
    name: string;
    sets: number;
    reps: number;
    notes?: string;
}

interface CreateWorkoutRequest {
    user_id: string;
    name: string;
    exercises?: ExerciseInput[];
}

class CreateWorkoutService {
    async execute({ user_id, name, exercises }: CreateWorkoutRequest) {
        if (!user_id) throw new Error("User ID is required");
        if (!name) throw new Error("Workout name is required");

        const workout = await prisma.workouts.create({
            data: {
                name,
                user_id,
                ...(exercises?.length
                    ? {
                        exercises: {
                            create: exercises.map((exercise) => ({
                                name: exercise.name,
                                sets: exercise.sets,
                                reps: exercise.reps,
                                notes: exercise.notes,
                            })),
                        },
                    }
                    : {}),
            },
            include: {
                exercises: true,
            }
        });

        return workout;
    }
}

export { CreateWorkoutService }
