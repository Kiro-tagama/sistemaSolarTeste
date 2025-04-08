// scripts/seedUser.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user';

dotenv.config();

async function seedUser() {
    await mongoose.connect(process.env.MONGODB_URI!);

    const exists = await User.findOne({ email: 'admin@solar.com' });
    if (!exists) {
        await User.create({
            email: 'admin@solar.com',
            password: '123456',
        });
        console.log('Usuário criado!');
    } else {
        console.log('Usuário já existe!');
    }

    mongoose.disconnect();
}

seedUser();
