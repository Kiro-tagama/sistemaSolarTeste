import { Request, Response } from 'express';

// Por enquanto sem banco, só um mock:
let planets = [
  {
    id: '1',
    name: 'Earth',
    diameter: 12742,
    rotationPeriod: '24h',
    distanceFromSun: 149.6,
    hasRings: false,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'
  }
];

export function getAllPlanets(req: Request, res: Response) {
  res.json(planets);
  return;
};

export function getPlanetById(req: Request, res: Response) {
  const planet = planets.find(p => p.id === req.params.id);
  if (!planet) {
    res.status(404).json({ message: 'Planet not found' });
    return;
  }
  res.json(planet);
  return;
};

export function createPlanet(req: Request, res: Response) {
  const { name, diameter, rotationPeriod, distanceFromSun, hasRings, imageUrl } = req.body;

  if (!name || !diameter || !rotationPeriod || !distanceFromSun || imageUrl === undefined) {
    res.status(400).json({ message: 'Missing fields' });
    return
  }

  const existingPlanet = planets.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (existingPlanet) {
    res.status(400).json({ message: 'Planet already exists!' });
    return
  }

  const newPlanet = {
    id: (planets.length + 1).toString(),
    name,
    diameter,
    rotationPeriod,
    distanceFromSun,
    hasRings: !!hasRings,
    imageUrl
  };

  planets.push(newPlanet);
  res.status(201).json(newPlanet);
  return;
};
