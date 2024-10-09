// index.js

// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Importer les modules nécessaires
const express = require('express');
const cors = require('cors');

// Créer une instance de l'application Express
const app = express();

// Utiliser le middleware CORS pour permettre les requêtes cross-origin
app.use(cors());

// Utiliser le middleware pour parser les requêtes JSON
app.use(express.json());

// Définir le port à utiliser, depuis les variables d'environnement ou par défaut 3000
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
