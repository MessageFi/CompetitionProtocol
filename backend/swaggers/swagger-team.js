const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project API',
      version: '1.0.0',
      description: 'API documentation for CompetitionProtocol-team',
    },
  },
  apis: ['./routes/team.js'],
};

const teamSwaggerSpec = swaggerJSDoc(options);

module.exports = teamSwaggerSpec;