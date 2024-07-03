import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No authorization header" });
    }
    //the header looks like this "Authentication: Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (token !== process.env.ACCESS_KEY) {
        return res.status(403).json({ message: "Wrong ACCESS_KEY" });
    }

    next();
};
