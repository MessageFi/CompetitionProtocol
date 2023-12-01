const swaggerJSDoc = require('swagger-jsdoc');
// const path = require('path');
// const a = require('../routes/project')
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
  // apis: [
  //   path.join(__dirname, 'routes', 'project.js'),
  //   path.join(__dirname, 'routes', 'team.js'),
  // ],
};

const teamSwaggerSpec = swaggerJSDoc(options);

module.exports = teamSwaggerSpec;