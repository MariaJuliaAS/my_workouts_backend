import { prisma } from "../../prisma/prisma";


class DetailUserService{
    async execute(id: string){

        if(!id){
            throw new Error("User ID is required");
        }

        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                workouts: true,
                personal_records: true,
                password: false,
                updated_at: false,
            }
        })

        return user;
    }
}

export { DetailUserService }