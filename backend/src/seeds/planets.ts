import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Planet } from '../models/planets';

dotenv.config();

const solarPlanets = [
    {
        name: 'Mercury',
        diameter: 4879,
        rotationPeriod: '58.6d',
        distanceFromSun: 57.9,
        hasRings: false,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg'
    },
    {
        name: 'Venus',
        diameter: 12104,
        rotationPeriod: '243d',
        distanceFromSun: 108.2,
        hasRings: false,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg'
    },
    {
        name: 'Earth',
        diameter: 12742,
        rotationPeriod: '24h',
        distanceFromSun: 149.6,
        hasRings: false,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'
    },
    {
        name: 'Mars',
        diameter: 6779,
        rotationPeriod: '24.6h',
        distanceFromSun: 227.9,
        hasRings: false,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'
    },
    {
        name: 'Jupiter',
        diameter: 139820,
        rotationPeriod: '9.9h',
        distanceFromSun: 778.3,
        hasRings: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg'
    },
    {
        name: 'Saturn',
        diameter: 116460,
        rotationPeriod: '10.7h',
        distanceFromSun: 1427,
        hasRings: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg'
    },
    {
        name: 'Uranus',
        diameter: 50724,
        rotationPeriod: '17.2h',
        distanceFromSun: 2871,
        hasRings: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg'
    },
    {
        name: 'Neptune',
        diameter: 49244,
        rotationPeriod: '16.1h',
        distanceFromSun: 4495,
        hasRings: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg'
    }
];

async function seedPlanets() {
    await mongoose.connect(process.env.MONGODB_URI!);

    const existing = await Planet.find();
    if (existing.length === 0) {
        await Planet.insertMany(solarPlanets);
        console.log('Planets seeded!');
    } else {
        console.log('Planets already seeded.');
    }

    await mongoose.disconnect();
}

seedPlanets();
