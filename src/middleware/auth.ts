// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Nous créons une interface pour étendre Request et y ajouter la propriété 'user'
interface AuthRequest extends Request {
  user?: any;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Récupérer le token depuis le header 'Authorization'
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Ajouter les informations décodées à la requête
    next(); // Passer au middleware ou route suivant
  } catch (error) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};

export default auth;
