const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Implémentation de la création d'un cours
async function createCourse(req, res) {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required and should be a non-empty string.' });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ message: 'Description is required and should be a non-empty string.' });
    }

    const course = { name, description, createdAt: new Date() };
    const result = await mongoService.insertOne('courses', course);
    course._id = result._id;  // Ajouter l'ID à la réponse

    res.status(201).json({ message: 'Course created successfully.', course });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course.', error: error.message });
  }
}

// Implémentation de la récupération d'un cours
async function getCourse(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID.' });
    }

    const course = await mongoService.findOneById('courses', new ObjectId(id));

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course.', error: error.message });
  }
}

// Implémentation des statistiques sur les cours
async function getCourseStats(req, res) {
  try {
    const stats = await mongoService.aggregate('courses', [
      { $group: { _id: null, totalCourses: { $sum: 1 }, avgDescriptionLength: { $avg: { $strLenCP: "$description" } } } },
    ]);

    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course stats.', error: error.message });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};
