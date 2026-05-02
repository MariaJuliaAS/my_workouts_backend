
import { hash } from "bcrypt";
import { prisma } from "../../prisma/prisma";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if (!email) {
            throw new Error("Email incorrect")
        }

        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const hashPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        return user;
    }
}

export { CreateUserService }