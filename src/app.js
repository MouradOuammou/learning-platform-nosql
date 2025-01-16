const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const swaggerUI = require("swagger-ui-express");
const swaggerS = require("./config/swagger");

const app = express();

async function startServer() {
  try {
    // Initialisation des connexions aux bases de données
    console.log('Connexion à MongoDB...');
    await db.connectMongo();
    console.log('Connexion à Redis...');
    await db.connectRedis();

    // Configuration des middlewares Express
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Montage des routes
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerS));


    // Gestion des erreurs globales
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Une erreur interne est survenue.', error: err.message });
    });

    // Démarrage du serveur
    const PORT = config.port || 3002;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
      console.log(
        `Swagger Docs available at http://localhost:${config.port}/api-docs`
      );
    });
  } catch (error) {
    console.error('Échec du démarrage du serveur:', error.message);
    process.exit(1); // Sortie en cas d'échec du démarrage
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('Arrêt du serveur...');
  try {
    if (db.mongoClient) {
      await db.mongoClient.close();
      console.log('Connexion MongoDB fermée.');
    }
    if (db.redisClient) {
      await db.redisClient.quit();
      console.log('Connexion Redis fermée.');
    }
    process.exit(0); // Sortie après l'arrêt du serveur
  } catch (error) {
    console.error('Erreur lors de l\'arrêt du serveur:', error.message);
    process.exit(1); // Sortie en cas d'erreur lors de l'arrêt
  }
});

startServer();
