import { prisma } from "../../prisma/prisma";


class GetAllPrService {
    async execute(user_id: string) {
        if (!user_id) throw new Error("User ID is required");

        const prs = await prisma.personal_records.findMany({
            where: { user_id }
        })
        if (!prs) throw new Error("No personal records found for this user");

        return prs;
    }
}

export { GetAllPrService }