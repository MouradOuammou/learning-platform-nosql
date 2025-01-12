const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route pour créer un cours
router.post('/', async (req, res) => {
  try {
    await courseController.createCourse(req, res);
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route pour obtenir un cours spécifique par ID
router.get('/:id', async (req, res) => {
  try {
    await courseController.getCourse(req, res);
  } catch (error) {
    console.error("Erreur lors de la récupération du cours:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route pour obtenir les statistiques des cours
router.get('/stats', async (req, res) => {
  try {
    await courseController.getCourseStats(req, res);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des cours:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

module.exports = router;
