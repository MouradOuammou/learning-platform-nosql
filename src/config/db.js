const { MongoClient } = require("mongodb");
const redis = require('redis');
const config = require('./env'); // Ce fichier doit contenir les variables d'environnement

let mongoClient, redisClient, db;

// Fonction pour connecter à MongoDB
async function connectMongo() {
  try {
    // Connexion à MongoDB avec l'URI et le nom de la base de données définis dans le fichier .env
    mongoClient = new MongoClient(process.env.MONGODB_URI);

    // Essayer de se connecter à MongoDB
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGODB_DB_NAME); // Sélectionner la base de données

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Tentative de reconnexion après 5 secondes si l'erreur persiste
    setTimeout(connectMongo, 5000); // Tentative de reconnexion après 5 secondes
  }
}

// Fonction pour connecter à Redis
async function connectRedis() {
  try {
    // Création du client Redis en utilisant l'URI définie dans le fichier .env
    redisClient = redis.createClient({
      url: process.env.REDIS_URI,
    });

    // Connexion à Redis
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Redis connection error:', err);
    // Tentative de reconnexion après 5 secondes
    setTimeout(connectRedis, 5000); // Tentative de reconnexion après 5 secondes
  }
}

// Exporter les fonctions et les clients pour être utilisés ailleurs
module.exports = {
  connectMongo,
  connectRedis,
  mongoClient,
  redisClient,
  db,
};
