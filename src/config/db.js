const { MongoClient } = require("mongodb");
const redis = require('redis');
const config = require('./env'); 

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    // Connexion à MongoDB avec l'URI et le nom de la base de données définis dans le fichier .env
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    // Connexion à MongoDB
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGODB_DB_NAME); // Sélectionner la base de donnéess
    console.log('Successfully connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    setTimeout(connectMongo, 5000); // Réessaie de se connecter après 5 secondes
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
    console.log('Successfully connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
    setTimeout(connectRedis, 5000); // Réessaie de se connecter après 5 secondes
  }
}

// Fonction de déconnexion propre pour MongoDB
async function disconnectMongo() {
  try {
    await mongoClient.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
}

// Fonction de déconnexion propre pour Redis
async function disconnectRedis() {
  try {
    await redisClient.quit();
    console.log('Disconnected from Redis');
  } catch (err) {
    console.error('Error disconnecting from Redis:', err);
  }
}

// Fonction pour vérifier la connexion à MongoDB et Redis
async function checkConnections() {
  // Vérification de la connexion MongoDB
  if (mongoClient && mongoClient.topology && mongoClient.topology.isConnected()) {
    console.log('MongoDB is connected.');
  } else {
    console.log('MongoDB is not connected.');
  }

  // Vérification de la connexion Redis
  if (redisClient && redisClient.isOpen) {
    console.log('Redis is connected.');
  } else {
    console.log('Redis is not connected.');
  }
}
function getDbObject() {
  if (!db) {
    throw new Error("Database not initialized yet.");
  }
  return db;
}
// Exporter les fonctions et les clients pour être utilisés ailleurs
module.exports = {
  connectMongo,
  connectRedis,
  disconnectMongo,
  disconnectRedis,
  checkConnections,
  getDbObject,
};
