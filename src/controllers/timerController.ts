// src/controllers/timerController.ts

import { Request, Response } from 'express';
import Timer from '../models/Timer';

export const addTime = async (req: Request, res: Response): Promise<void> => {
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

export const getUserTimes = async (req: Request, res: Response): Promise<void> => {
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

export const getAllTimes = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.role) {
      res.status(403).json({ message: 'Accès refusé.' });
      return;
    }

    const times = await Timer.find().populate('user_id', 'email');

    res.json(times);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
