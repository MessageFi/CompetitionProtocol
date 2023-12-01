
const express = require('express');
const http = require("http");
const url = require('url');
const qs = require('querystring');

const projectRoutes = require('./routes/project');
const teamRoutes = require('./routes/team'); 

const swaggerUi = require('swagger-ui-express');
const projectSwaggerSpec = require('./swaggers/swagger-project');
const teamSwaggerSpec = require('./swaggers/swagger-team');

const app = express();
const db = require('./db/db');
// 解析表单数据
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger UI for project
app.use('/project-api-docs', swaggerUi.serve, swaggerUi.setup(projectSwaggerSpec));

// Team API Swagger UI
app.use('/team-api-docs', swaggerUi.serve, swaggerUi.setup(teamSwaggerSpec));

app.use('/', projectRoutes);
app.use('/', teamRoutes);


  // Start the server
app.listen(3000, () => {
    console.log(
    `Server is running on http://124.156.177.144:3000 
    project api doc is http://127.0.0.1:3000/project-api-docs/  
    team api doc is http://127.0.0.1:3000/team-api-docs`
    );
});
