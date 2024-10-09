// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User, { IUser } from '../models/User';

// Fonction pour l'inscription
export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());  // Ajouter ce log pour voir les erreurs
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, role } = req.body;
  console.log("Received registration data:", { email, password, role });  // Ajouter ce log pour voir les données reçues

    try {
      const { email, password, role } = req.body;
  
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
        return;
      }
  
      // Hacher le mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Créer un nouvel utilisateur
      const newUser: IUser = new User({
        email,
        password: hashedPassword,
        role,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };

// Fonction pour la connexion
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Identifiants invalides.' });
        return;
      }
  
      // Comparer le mot de passe avec le mot de passe haché
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Identifiants invalides.' });
        return;
      }
  
      // Créer un token JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  };
