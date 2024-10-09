import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";

import authRoutes from "./routes/auth";

import timerRoutes from "./routes/timer";
dotenv.config();

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Très important pour parser le JSON dans les requêtes

// Enregistrement des routes
app.use("/api/auth", authRoutes);
app.use("/api/timer", timerRoutes);

app.get("/", (req, res) => {
  res.send(`Bienvenue sur l'API F1 Reaction Timer!`);
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Démarrage du serveur si le fichier n'est pas importé dans un autre module
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}

// Exporter l'application pour les tests
export default app;
