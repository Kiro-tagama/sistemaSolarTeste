import { Router } from 'express';
import { getAllPlanets, getPlanetById, createPlanet } from '../controllers/planet';

const router = Router();

router.get('/', getAllPlanets);
router.get('/:id', getPlanetById);
router.post('/', createPlanet);

export default router;
