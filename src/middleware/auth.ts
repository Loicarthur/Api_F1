import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface étendue pour inclure req.user
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: boolean;
  };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: boolean };
    req.user = decoded;
    console.log("Decoded token:", decoded); // Log pour vérifier le contenu du token
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};

export default auth;
