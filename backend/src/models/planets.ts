import { Schema, model } from 'mongoose';

const planetSchema = new Schema({
    name: { type: String, required: true },
    diameter: { type: Number, required: true },
    rotationPeriod: { type: String, required: true },
    distanceFromSun: { type: Number, required: true },
    hasRings: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
});

export const Planet = model('Planet', planetSchema);
