import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authenticate = (req: Request, res: Response, next: NextFunction): void | Response => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        const decodedPayload = decoded as JwtPayload;
        req.user_name = decodedPayload.user_name;
        next();
    });
};

export default authenticate;
