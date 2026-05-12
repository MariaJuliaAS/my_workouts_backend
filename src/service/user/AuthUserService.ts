import { compare } from "bcrypt";
import { prisma } from "../../prisma/prisma";
import Jwt from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest) {
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!user){
            throw new Error("Email or password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Email or password incorrect")
        }

        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret) {
            throw new Error("JWT secret not found")
        }

        const token = Jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            jwtSecret,
            {
                subject: user.id,
                expiresIn: '15d'
            }
        )

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }
}

export { AuthUserService }