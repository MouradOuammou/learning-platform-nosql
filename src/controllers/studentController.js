const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Implémentation de la création d'un étudiant
async function createStudent(req, res) {
  try {
    const {id , name, age, course } = req.body;

    if (typeof age !== 'number' || age < 18 || age > 100) {
      return res.status(400).json({ message: 'Age must be a number between 18 and 100.' });
    }

    // Création de l'étudiant
    const student = { name, age, course, createdAt: new Date()};
    const result = await mongoService.create('students', student);

    // Réponse avec succès
    res.status(201).json({ message: 'Student created successfully.', student: result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create student.', error: error.message });
  }
}

// Implémentation de la récupération d'un étudiant
async function getStudent(req, res) {
  try {
    const { id } = req.params; // Récupérer l'ID depuis les paramètres
    
    // Vérification si l'ID est valide
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID format.' });
    }

    // Recherche de l'étudiant dans la base de données
    const student = await mongoService.findOneById('students', id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Si l'étudiant est trouvé, renvoyer le document
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

// Implémentation de la récupération de tous les étudiants avec pagination
async function getAllStudents(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination avec des valeurs par défaut
    const cacheKey = `students_page_${page}_limit_${limit}`;

    // Vérification du cache Redis
    const cachedStudents = await redisService.get(cacheKey);
    if (cachedStudents) {
      return res.json(JSON.parse(cachedStudents)); // Retourner les données en cache si elles existent
    }

    // Si pas de cache, récupération des étudiants depuis MongoDB
    const studentsCollection = db.collection('students');
    const students = await studentsCollection.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .toArray();

    // Mise en cache des étudiants récupérés pour une durée d'1 heure
    redisService.set(cacheKey, JSON.stringify(students), 'EX', 3600);

    // Réponse avec les étudiants
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students.', error: err.message });
  }
}

module.exports = {
  createStudent,
  getStudent,
  getStudentStats,
  getAllStudents,
};
