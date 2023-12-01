const swaggerJSDoc = require('swagger-jsdoc');
// const path = require('path');
// const a = require('../routes/project')
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project API',
      version: '1.0.0',
      description: 'API documentation for CompetitionProtocol-player',
    },
  },
  apis: ['./routes/player.js'],
};

const playerSwaggerSpec = swaggerJSDoc(options);

module.exports = playerSwaggerSpec;