const redis = require('redis');
const util = require('util');

let redisClient;

// Initialisation du client Redis
async function initializeRedis(redisUri) {
  try {
    redisClient = redis.createClient({ url: redisUri });
    await redisClient.connect();

    console.log('Connexion à Redis réussie.');
    return redisClient;
  } catch (error) {
    console.error('Erreur lors de la connexion à Redis:', error.message);
    throw error;
  }
}

/**
 * Mettre des données en cache dans Redis.
 * 
 * @param {string} key - La clé pour identifier les données dans Redis.
 * @param {Object|string} data - Les données à mettre en cache.
 * @param {number} ttl - Durée de vie des données en cache (en secondes).
 */
async function cacheData(key, data, ttl) {
  try {
    const value = typeof data === 'string' ? data : JSON.stringify(data);
    await redisClient.setEx(key, ttl, value);
    console.log(`Données mises en cache avec succès : clé=${key}`);
  } catch (error) {
    console.error('Erreur lors de la mise en cache:', error.message);
    throw error;
  }
}

/**
 * Récupérer des données depuis Redis.
 * 
 * @param {string} key - La clé pour identifier les données dans Redis.
 * @returns {Object|string|null} - Les données récupérées ou `null` si non trouvées.
 */
async function getCachedData(key) {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération des données en cache:', error.message);
    throw error;
  }
}

/**
 * Supprimer une entrée en cache de Redis.
 * 
 * @param {string} key - La clé pour identifier les données dans Redis.
 */
async function deleteCache(key) {
  try {
    await redisClient.del(key);
    console.log(`Cache supprimé : clé=${key}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du cache:', error.message);
    throw error;
  }
}

/**
 * Vérifier si une clé existe dans Redis.
 * 
 * @param {string} key - La clé à vérifier.
 * @returns {boolean} - `true` si la clé existe, sinon `false`.
 */
async function cacheExists(key) {
  try {
    const exists = await redisClient.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('Erreur lors de la vérification du cache:', error.message);
    throw error;
  }
}

// Export des fonctions utilitaires
module.exports = {
  initializeRedis,
  cacheData,
  getCachedData,
  deleteCache,
  cacheExists,
};
