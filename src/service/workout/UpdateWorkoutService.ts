import { response } from "express";
import { prisma } from "../../prisma/prisma";

interface ExerciseInput {
    id: string;
    name: string;
    sets: number;
    reps: number;
    notes?: string;
}

interface UpdateWorkoutRequest {
    name: string;
    exercises?: ExerciseInput[];
    workout_id: string;
}

class UpdateWorkoutService {
    async execute({ name, workout_id, exercises }: UpdateWorkoutRequest) {
        if (!workout_id) throw new Error("Workout ID is required");

        const workout = await prisma.workouts.findFirst({
            where: {
                id: workout_id,
            }
        });
        if (!workout) throw new Error("Workout not found or not owned by user");

        const updated = await prisma.workouts.update({
            where: { id: workout_id },
            data: {
                name,
                ...(exercises?.length ? {
                    exercises: {
                        update: exercises.map((exercise) => ({
                            where: { id: exercise.id },
                            data: {
                                name: exercise.name,
                                sets: exercise.sets,
                                reps: exercise.reps,
                                notes: exercise.notes,
                            }
                        }))
                    }
                } : {})
            }
        });

        return updated;
    }
}

export { UpdateWorkoutService }
