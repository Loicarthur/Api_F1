// src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db';

import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Très important pour parser le JSON dans les requêtes

// Enregistrement des routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API F1 Reaction Timer!');
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
