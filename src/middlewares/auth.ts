import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if (!token)
        return res.status(401).json({
            message: 'unauthorized',
        });

    return verify(token, 'TARTARUGADOMAL', (error, data) => {
        if (error) return res.status(500).json({ message: error.message });

        // @ts-ignore
        req.userId = data.user;

        return next();
    });
};
