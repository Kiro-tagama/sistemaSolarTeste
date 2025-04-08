// controllers/planetController.ts
import { Request, Response } from 'express';
import { Planet } from '../models/planets';

export async function getAllPlanets(req: Request, res: Response) {
  const planets = await Planet.find();
  res.json(planets);
  return;
}

export async function getPlanetById(req: Request, res: Response) {
  const planet = await Planet.findById(req.params.id);
  if (!planet) {
    res.status(404).json({ message: 'Planet not found' });
    return;
  }
  res.json(planet);
  return;
}

export async function createPlanet(req: Request, res: Response) {
  const { name, diameter, rotationPeriod, distanceFromSun, hasRings, imageUrl } = req.body;

  if (!name || !diameter || !rotationPeriod || !distanceFromSun || !imageUrl) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const existing = await Planet.findOne({ name: new RegExp(`^${name}$`, 'i') });
  if (existing) {
    return res.status(400).json({ message: 'Planet already exists!' });
  }

  const newPlanet = new Planet({
    name,
    diameter,
    rotationPeriod,
    distanceFromSun,
    hasRings,
    imageUrl
  });

  await newPlanet.save();
  res.status(201).json(newPlanet);
  return;
}
