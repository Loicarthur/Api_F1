// src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db'; // Import de connectDB

dotenv.config();

const app = express();

connectDB(); // Connexion à MongoDB

app.use(cors());
app.use(express.json());

// Définir une route de base pour tester le serveur
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API F1 Reaction Timer!');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
