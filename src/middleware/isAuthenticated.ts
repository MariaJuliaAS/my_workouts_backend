import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).json({message: "Unauthorized"});
    }

    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        return res.status(500).json({message: "Internal Server Error"});
    }

    const [, token] = authToken.split(" ");

    try{
        const {sub} = jwt.verify(token, jwtSecret) as {sub: string};
        req.user_id = sub;
        return next();
    }catch(err){
        return res.status(401).json({message: "Unauthorized"});
    }
}