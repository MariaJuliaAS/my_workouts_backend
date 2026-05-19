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

        const workoutLogs = await prisma.workout_logs.findMany({
            where: { workouts_id: workout_id },
            select: { id: true },
        });
        const workoutLogIds = workoutLogs.map(w => w.id);

        if (workoutLogIds.length) {
            await prisma.exercises_logs.deleteMany({
                where: { workout_logs_id: { in: workoutLogIds } },
            });
        }

        await prisma.workout_logs.deleteMany({ where: { workouts_id: workout_id } });

        const exercises = await prisma.exercises.findMany({
            where: { workouts_id: workout_id },
            select: { id: true },
        });
        const exerciseIds = exercises.map(e => e.id);

        if (exerciseIds.length) {
            await prisma.exercises_logs.deleteMany({
                where: { exercise_id: { in: exerciseIds } },
            });
        }

        await prisma.exercises.deleteMany({ where: { workouts_id: workout_id } });

        await prisma.workouts.delete({ where: { id: workout_id } });

        return {
            message: "Workout '" + workout.name + "' deleted",
        };
    }
}

export { DeleteWorkoutService }
