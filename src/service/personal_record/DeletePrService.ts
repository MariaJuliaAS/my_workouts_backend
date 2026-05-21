import { prisma } from "../../prisma/prisma";


class DeletePrService {
    async execute(pr_id: string) {
        if (!pr_id) throw new Error("Personal Record ID is required");

        const pr = await prisma.personal_records.delete({
            where: { id: pr_id }
        })
        if (!pr) throw new Error("Personal Record not found");

        return pr;
    }
}

export { DeletePrService }