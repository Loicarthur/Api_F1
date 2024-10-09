import { Response } from 'express';
import Timer from '../models/Timer';
import { AuthRequest } from '../middleware/auth';

// Fonction pour ajouter un temps de réaction
export const addTime = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { time } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const newTimer = new Timer({
      user_id: userId,
      time,
    });

    await newTimer.save();

    res.status(201).json({ message: 'Temps de réaction enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Fonction pour obtenir les temps de l'utilisateur connecté
export const getUserTimes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const times = await Timer.find({ user_id: userId });

    res.json(times);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Fonction pour obtenir tous les temps de réaction (administrateur uniquement)
export const getAllTimes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user && req.user.role !== false) {
      res.status(403).json({ message: 'Accès refusé.' });
      return;
    }

    const allTimes = await Timer.find().populate('user_id', 'email');

    res.status(200).json(allTimes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des temps de réaction.' });
  }
};
