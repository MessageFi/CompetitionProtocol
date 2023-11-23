const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project API',
      version: '1.0.0',
      description: 'API documentation for the Project service',
    },
  },
//   apis: ['./routes/*.js'],
  apis: ['./server.js'], // 根据你的实际情况调整路由文件的路径
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;