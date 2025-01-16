const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing and providing information about courses
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course in the platform
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier for the course
 *               name:
 *                 type: string
 *                 description: Title of the course
 *               description:
 *                 type: string
 *                 description: Detailed explanation of what the course covers
 *               instructor:
 *                 type: string
 *                 description: Name of the course instructor
 *               duration:
 *                 type: integer
 *                 description: Length of the course in hours
 *               category:
 *                 type: string
 *                 description: Category or subject area of the course
 *               studentsEnrolled:
 *                 type: integer
 *                 description: Total number of students enrolled in this course
 *             required:
 *               - name
 *               - description
 *               - instructor
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: The request contains invalid data
 */
router.post("/", courseController.createCourse);

/**
 * @swagger
 * /courses/stats:
 *   get:
 *     summary: Retrieve overall statistics of the courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Successful retrieval of course statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCourses:
 *                   type: integer
 *                   description: Total number of courses available on the platform
 *                   example: 5
 *                 totalDuration:
 *                   type: integer
 *                   description: Total combined duration of all courses in hours
 *                   example: 50
 *                 totalStudentsEnrolled:
 *                   type: integer
 *                   description: Total number of students enrolled in all courses
 *                   example: 600
 *       500:
 *         description: An error occurred while retrieving the statistics
 */
router.get("/stats", courseController.getCourseStats);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Fetch a specific course using its unique ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the course
 *     responses:
 *       200:
 *         description: Successfully retrieved the course details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier of the course
 *                 name:
 *                   type: string
 *                   description: Name of the course
 *                 description:
 *                   type: string
 *                   description: Brief summary of the course content
 *                 instructor:
 *                   type: string
 *                   description: Instructor of the course
 *       404:
 *         description: Course with the given ID does not exist
 */
router.get("/:id", courseController.getCourse);

module.exports = router;
