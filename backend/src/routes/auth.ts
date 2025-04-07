import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

const user = {
    email: 'admin@solar.com',
    password: '123456',
};

router.post('/', (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === user.email && password === user.password) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'default', {
            expiresIn: '2h',
        });
        res.status(200).json({ token });
        return;
    }

    res.status(401).json({ message: 'Invalid credentials' });
    return;
});

export default router;
