const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Learning Platform API", 
      version: "1.0.0",
      description: "Comprehensive API documentation for the Student Learning Platform.", 
    },
    servers: [
      {
        url: "http://localhost:3002", 
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = swaggerSpecs;
