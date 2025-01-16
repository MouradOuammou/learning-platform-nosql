const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); 

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing students in the platform
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student in the platform
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier for the student
 *               name:
 *                 type: string
 *                 description: Full name of the student
 *               age:
 *                 type: integer
 *                 description: Age of the student
 *               course:
 *                 type: string
 *                 description: Course the student is enrolled in
 *             required:
 *               - name
 *               - age
 *               - course
 *     responses:
 *       201:
 *         description: Student successfully created
 *       400:
 *         description: Invalid input data
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student details by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the student
 *     responses:
 *       200:
 *         description: Successfully retrieved the student details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Student's unique identifier
 *                 name:
 *                   type: string
 *                   description: Student's full name
 *                 age:
 *                   type: integer
 *                   description: Age of the student
 *                 course:
 *                   type: string
 *                   description: Course the student is enrolled in
 *       404:
 *         description: Student not found with the given ID
 */
router.get('/:id', studentController.getStudent);

/**
 * @swagger
 * /students/stats:
 *   get:
 *     summary: Retrieve overall statistics about the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Successfully retrieved the student statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalStudents:
 *                   type: integer
 *                   description: Total number of students in the platform
 *                   example: 100
 *                 averageAge:
 *                   type: number
 *                   format: float
 *                   description: Average age of the students
 *                   example: 22.5
 *       500:
 *         description: Error retrieving student statistics
 */
router.get('/stats', studentController.getStudentStats);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get a list of all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Student's unique identifier
 *                   name:
 *                     type: string
 *                     description: Student's full name
 *                   age:
 *                     type: integer
 *                     description: Student's age
 *                   course:
 *                     type: string
 *                     description: Course the student is enrolled in
 */
router.get('/', studentController.getAllStudents);

module.exports = router;
