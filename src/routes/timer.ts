// src/routes/timer.ts

import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

import { addTime, getUserTimes, getAllTimes } from '../controllers/timerController';
import auth from '../middleware/auth';

const router = Router();

// Route pour ajouter un temps de réaction
router.post(
  '/submit-reaction-time',
  auth,
  [check('time', 'Le temps est requis et doit être un nombre').isNumeric()],
  (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    addTime(req, res);
  }
);

// Route pour obtenir les temps de l'utilisateur connecté
router.get('/me', auth, (req: Request, res: Response): void => {
  getUserTimes(req, res);
});

// Route pour obtenir tous les temps (administrateur uniquement)
router.get('/all', auth, (req: Request, res: Response): void => {
  getAllTimes(req, res);
});

export default router;
