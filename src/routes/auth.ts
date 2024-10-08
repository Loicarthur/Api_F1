// src/routes/auth.ts

import { Router } from 'express';
import { check, validationResult } from 'express-validator';

import { register, login } from '../controllers/authController';

const router = Router();

// Route d'inscription
router.post(
  '/register',
  [
    check('email', 'Email invalide').isEmail(),
    check('password', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
    check('role', 'Le rôle est requis et doit être un booléen').isBoolean(),
  ],
  (req, res) => {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    register(req, res);
  }
);

// Route de connexion
router.post(
  '/login',
  [
    check('email', 'Email invalide').isEmail(),
    check('password', 'Le mot de passe est requis').exists(),
  ],
  (req, res) => {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    login(req, res);
  }
);

export default router;
