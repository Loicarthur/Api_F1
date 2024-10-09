// src/routes/auth.ts

import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { register, login } from '../controllers/authController';

const router = Router();

// Route pour enregistrer un nouvel utilisateur
router.post(
  '/register',
  [
    check('email', 'L\'email est requis et doit être valide').isEmail(),
    check('password', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
    check('role', 'Le rôle est requis et doit être un booléen').isBoolean(),
  ],
  (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Arrêter l'exécution de la fonction
    }
    register(req, res);
  }
);

// Route pour connecter un utilisateur
router.post(
  '/login',
  [
    check('email', 'L\'email est requis').isEmail(),
    check('password', 'Le mot de passe est requis').exists(),
  ],
  (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Arrêter l'exécution de la fonction
    }
    login(req, res);
  }
);

export default router;
