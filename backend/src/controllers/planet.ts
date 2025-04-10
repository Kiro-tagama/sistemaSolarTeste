import { Request, Response } from 'express';
import { Planet } from '../models/planets';

export async function getAllPlanets(req: Request, res: Response) {
  const planets = await Planet.find();
  res.status(200).json(planets);
  return;
}

export async function getPlanetById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const planet = await Planet.findById(id);
    if (!planet) {
      res.status(404).json({ message: 'Planet not found' });
      return 
    }

    res.status(200).json(planet);
    return 
  } catch (error) {
    console.error('❌ GET /planets/:id error:', error);
    res.status(500).json({ message: 'Internal server error' });
    return 
  }
}

export async function createPlanet(req: Request, res: Response) {
  const { name, diameter, rotationPeriod, distanceFromSun, hasRings, imageUrl } = req.body;

  if (!name || !diameter || !rotationPeriod || !distanceFromSun || !imageUrl) {
    res.status(400).json({ message: 'Missing fields' });
    return
  }

  const existing = await Planet.findOne({ name: new RegExp(`^${name}$`, 'i') });
  if (existing) {
    res.status(400).json({ message: 'Planet already exists!' });
    return
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
