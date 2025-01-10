const { ObjectId } = require('mongodb');

/**
 * Trouver un document par son ID dans une collection MongoDB.
 * 
 * @param {Collection} collection - La collection MongoDB où chercher.
 * @param {string} id - L'ID du document à trouver.
 * @returns {Object|null} - Le document trouvé ou `null` s'il n'existe pas.
 * @throws {Error} - Si l'ID est invalide ou si une erreur survient lors de la recherche.
 */
async function findOneById(collection, id) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('ID invalide');
    }

    const document = await collection.findOne({ _id: new ObjectId(id) });
    return document;
  } catch (error) {
    console.error('Erreur lors de la recherche par ID:', error.message);
    throw error;
  }
}

/**
 * Insérer un document dans une collection MongoDB.
 * 
 * @param {Collection} collection - La collection MongoDB où insérer.
 * @param {Object} data - Les données à insérer.
 * @returns {Object} - Résultat de l'insertion.
 * @throws {Error} - Si une erreur survient lors de l'insertion.
 */
async function insertOne(collection, data) {
  try {
    const result = await collection.insertOne(data);
    return result.ops[0]; 
  } catch (error) {
    console.error('Erreur lors de l\'insertion:', error.message);
    throw error;
  }
}

/**
 * Mettre à jour un document par son ID.
 * 
 * @param {Collection} collection - La collection MongoDB où mettre à jour.
 * @param {string} id - L'ID du document à mettre à jour.
 * @param {Object} update - Les données de mise à jour.
 * @returns {Object} - Résultat de la mise à jour.
 * @throws {Error} - Si une erreur survient lors de la mise à jour.
 */
async function updateOneById(collection, id, update) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('ID invalide');
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );
    return result;
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error.message);
    throw error;
  }
}

/**
 * Supprimer un document par son ID.
 * 
 * @param {Collection} collection - La collection MongoDB où supprimer.
 * @param {string} id - L'ID du document à supprimer.
 * @returns {Object} - Résultat de la suppression.
 * @throws {Error} - Si une erreur survient lors de la suppression.
 */
async function deleteOneById(collection, id) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('ID invalide');
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error.message);
    throw error;
  }
}

// Export des fonctions utilitaires
module.exports = {
  findOneById,
  insertOne,
  updateOneById,
  deleteOneById,
};
