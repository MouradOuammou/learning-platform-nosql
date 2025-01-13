const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Learning Platform API", 
      version: "1.0.0",
      description: 
      "Comprehensive API documentation for the Student Learning Platform. This API provides endpoints to manage students, courses, and their interactions within the platform. " +
      "The platform is designed to facilitate the learning experience, track student progress, and provide course-related information."   },
    servers: [
      {
        url: "http://localhost:3002", 
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swagger = swaggerJsDoc(options);

module.exports = swagger;
