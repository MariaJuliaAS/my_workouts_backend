import { prisma } from "../../prisma/prisma";

interface PrRequest {
    exercise_name: string;
    weight: number;
    reps: number;
    note?: string;
    user_id: string;
}

class CreatePrService {
    async execute({ exercise_name, weight, reps, note, user_id }: PrRequest) {
        if (!exercise_name) throw new Error("Exercise name is required");
        if (!weight) throw new Error("Weight is required");
        if (!reps) throw new Error("Reps are required");
        if (!user_id) throw new Error("User ID is required");

        const pr = await prisma.personal_records.create({
            data: {
                exercise_name,
                weight,
                reps,
                note,
                user_id
            }
        })

        return pr;
    }
}

export { CreatePrService }