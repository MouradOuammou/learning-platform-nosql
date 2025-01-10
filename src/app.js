const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

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
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Montage des routes
    app.use('/api/courses', courseRoutes);
    app.use('/api/students', studentRoutes);

    // Gestion des erreurs globales
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Une erreur interne est survenue.', error: err.message });
    });

    // Démarrage du serveur
    const PORT = config.port || 3002;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Échec du démarrage du serveur:', error.message);
    process.exit(1); 
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
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'arrêt du serveur:', error.message);
    process.exit(1);
  }
});

startServer();
