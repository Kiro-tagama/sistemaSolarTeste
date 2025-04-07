import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(403);
    return
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default', (err, user) => {
    if (err) {
      res.sendStatus(403);
      return
    }
    (req as any).user = user;
    next();
    return;
  });
}
