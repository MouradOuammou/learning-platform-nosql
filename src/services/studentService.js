const db = require('../config/db'); 

// Créer un étudiant
const createStudent = async (studentData) => {
  const result = await db.collection('students').insertOne(studentData);
  return result.ops[0];
};

// Récupérer un étudiant par ID
const getStudentById = async (id) => {
  return await db.collection('students').findOne({ _id: new ObjectId(id) });
};

// Récupérer tous les étudiants
const getAllStudents = async () => {
  return await db.collection('students').find().toArray();
};

// Récupérer des statistiques sur les étudiants
const getStats = async () => {
  const totalStudents = await db.collection('students').countDocuments();
  return { totalStudents };
}; 

module.exports = {
  createStudent,
  getStudentById,
  getAllStudents,
  getStats,
};
