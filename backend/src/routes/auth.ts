import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        res.status(401).json({ message: 'Invalid credentials' });
        return
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'default', {
        // expiresIn: '2h',
    });

    res.status(200).json({ token });
    return
});

export default router;
