const swaggerJSDoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trace API',
      version: '1.0.0',
      description: 'API documentation for CompetitionProtocol',
    },
  },
  apis: [
    './routes/trace.js',
    './routes/team.js',
    './routes/project.js',
    './routes/player.js'
  ],
  // apis: [
  //   path.join(__dirname, 'routes', 'project.js'),
  //   path.join(__dirname, 'routes', 'team.js'),
  // ],
};

const allSwaggerSpec = swaggerJSDoc(options);

module.exports = allSwaggerSpec;