const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Assurez-vous que le chemin est correct

// Route pour créer un étudiant
router.post('/', studentController.createStudent);

// Route pour obtenir un étudiant par ID
router.get('/:id', studentController.getStudent);

// Route pour obtenir des statistiques sur les étudiants
router.get('/stats', studentController.getStudentStats);

module.exports = router;
