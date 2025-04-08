import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import planetRoutes from './routes/planet';
import { authenticateToken } from './middleware/auth';
import { connectDB } from './config/mongo';

dotenv.config();
connectDB();

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/planets', authenticateToken, planetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
