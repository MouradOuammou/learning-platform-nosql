const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route pour créer un étudiant
router.post('/', async (req, res) => {
  try {
    await studentController.createStudent(req, res);
  } catch (error) {
    console.error("Erreur lors de la création de l'étudiant:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route pour obtenir un étudiant par ID
router.get('/:id', async (req, res) => {
  try {
    await studentController.getStudent(req, res);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'étudiant:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route pour obtenir des statistiques sur les étudiants
router.get('/stats', async (req, res) => {
  try {
    await studentController.getStudentStats(req, res);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des étudiants:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Route pour récupérer tous les étudiants
router.get('/', async (req, res) => {
  try {
    await studentController.getAllStudents(req, res);
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

module.exports = router;
