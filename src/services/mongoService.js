const { getDbObject } = require("../config/db");

async function findOneById(collectionName, id) {
  try {
    const db = getDbObject();
    let collection = db.collection(collectionName);
    const first = await collection.findOne({ id: id });
    return first;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
}
async function create(collectionName, course) {
  try {
    const db = getDbObject();
    let collection = db.collection(collectionName);
    return await collection.insertOne(course);
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
}

async function findCourseStats(collectionName) {
  try {
    const db = getDbObject();
    const collection = db.collection(collectionName);

    const stats = await collection
      .aggregate([
        {
          $group: {
            _id: null, 
            totalCourses: { $sum: 1 }, 
            totalDuration: { $sum: "$duration" }, 
            totalStudentsEnrolled: { $sum: "$studentsEnrolled" }, 
          },
        },
      ])
      .toArray();

    if (stats.length === 0) {
      throw new Error("No courses found");
    }

    const courseStats = {
      totalCourses: stats[0].totalCourses,
      totalDuration: stats[0].totalDuration,
      totalStudentsEnrolled: stats[0].totalStudentsEnrolled,
    };

    return courseStats;
  } catch (error) {
    console.error("Error retrieving course stats:", error);
    throw error;
  }
}

module.exports = {
  findOneById,
  create,
  findCourseStats,
};
