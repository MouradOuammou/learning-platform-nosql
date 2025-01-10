const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');

// Implémentation de la création d'un étudiant
async function createStudent(req, res) {
  try {
    console.log(req.body);
    const { name, age, course } = req.body;
    if (!name || !age || !course) {
      return res.status(400).json({ message: 'Name, age, and course are required.' });
    }

    // Exemple de logique métier (à adapter)
    const student = { name, age, course, createdAt: new Date() };
    const result = await mongoService.insertOne('students', student);

    // Réponse avec succès
    res.status(201).json({ message: 'Student created successfully.', student: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create student.', error: error.message });
  }
}

// Implémentation de la récupération d'un étudiant
async function getStudent(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID.' });
    }

    const student = await mongoService.findOneById('students', id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student.', error: error.message });
  }
}

// Implémentation des statistiques sur les étudiants
async function getStudentStats(req, res) {
  try {
    const stats = await mongoService.aggregate('students', [
      { $group: { _id: null, totalStudents: { $sum: 1 } } },
    ]);

    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student stats.', error: error.message });
  }
}

// Export des contrôleurs
module.exports = {
  createStudent,
  getStudent,
  getStudentStats,
};
