
import { hash } from "bcrypt";
import { prisma } from "../../prisma/prisma";

interface UserRequest {
    name: string;
    username: string;
    password: string;
}

class CreateUserService {
    async execute({ name, username, password }: UserRequest) {
        if (!username) {
            throw new Error("Username incorrect")
        }

        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                username
            }
        })
        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const hashPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                username,
                password: hashPassword
            },
            select: {
                id: true,
                name: true,
                username: true
            }
        })
        return user;
    }
}

export { CreateUserService }