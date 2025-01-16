const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');


// Implémentation de la création d'un cours
async function createCourse(req, res) {
  try {
    const courseData = req.body;
    const newCourse = await mongoService.create("courses", courseData);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
}
// Implémentation de la récupération d'un cours
async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    console.log(courseId);
    let course = await redisService.getData(courseId) ;
    if (!course) {
      course = await mongoService.findOneById("courses", courseId);
      if (course) {
        await redisService.cacheData(courseId, course);
      }
    }
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error getting course:", error);
    res.status(500).json({ error: "Failed to get course" });
  }
}

// Implémentation des statistiques sur les cours
async function getCourseStats(req, res) {
  try {
    const stats = await mongoService.findCourseStats("cours");
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error getting course stats:", error);
    res.status(500).json({ error: "Failed to get course stats" });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};
