// src/index.ts

// Importation des modules nécessaires
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer une instance de l'application Express
const app = express();

// Middlewares
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
