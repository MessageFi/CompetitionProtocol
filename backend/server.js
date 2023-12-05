
const express = require('express');
const http = require("http");
const url = require('url');
const qs = require('querystring');
const swaggerUi = require('swagger-ui-express');


const projectRoutes = require('./routes/project');
const teamRoutes = require('./routes/team');
const playerRoutes = require('./routes/player');
const traceRoutes = require('./routes/trace');



const allSwaggerSpec = require('./swaggers/swagger-all');

const app = express();
const db = require('./db/db');
// 解析表单数据
app.use(express.urlencoded({ extended: true }));//返回只解析urlencoded主体的中间件，并且只查看Content-Type头与类型选项匹配的请求
app.use(express.json());



// Swagger UI for all
app.use('/all-api-docs', swaggerUi.serve, swaggerUi.setup(allSwaggerSpec));


// 这里用路由中间件来校验用户权限
app.use('/', projectRoutes);
app.use('/', teamRoutes);
app.use('/', playerRoutes);
app.use('/', traceRoutes);


  // Start the server
app.listen(3000, () => {
    console.log(
    `Server is running on http://124.156.177.144:3000 
    all api doc is http://127.0.0.1:3000/all-api-docs/`
    );
});
