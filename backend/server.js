const mysql = require("mysql");
const express = require('express');
const http = require("http");
const url = require('url');
const qs = require('querystring');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const db = mysql.createConnection({
    host :"localhost",
    user :"root",
    password :"fyh0812",
    database :"competitionprotocol"
})
db.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database');
  });
const app = express();
// 解析表单数据
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * 确保前端在发送 POST 请求时使用了 application/x-www-form-urlencoded 作为 Content-Type
 */

// 
  app.post('/addproject', (req, res) => {
    const { candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url,creat_time } = req.body;
    db.query('INSERT INTO project (candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url,creat_time) VALUES (?, ?)', [candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url,creat_time], (err, result) => {
      if (err) throw err;
      res.status(201).json({ id: result.insertId});
    });
  });
/**
 * @swagger
 * /getallprojectinfo:
 *   get:
 *     summary: Get a list of projects
 *     description: Retrieve a list of project from the database.
 *     responses:
 *       200:
 *         description: A list of projects.
 *         content:
 *           application/json:
 *             example:
 *                - id: 1
 *                  candidate_id: 1
 *                  team_id: 1
 *                  trace_id: 1
 *                  name: competitionprotocol
 *                  logo: ipfs.io
 *                  brand: aaaaa
 *                  introduction: This is a introduction
 *                  git_hub_url: https://github.com/DankFang
 *                  twitter_url: DankFang
 *                  telegram_url: telegram_url
 *                  discord_url: discord_url
 *                  demo_url: demo_url
 *                  video_url: video_url
 *                  creat_time: 2023-1-1
 * 
 *                - id: 2
 *                  candidate_id: 2
 *                  team_id: 2
 *                  trace_id: 2
 *                  name: competitionprotocol
 *                  logo: ipfs.io
 *                  brand: bbbbb
 *                  introduction: This is a introduction
 *                  git_hub_url: https://github.com/DankFang
 *                  twitter_url: DankFang
 *                  telegram_url: telegram_url
 *                  discord_url: discord_url
 *                  demo_url: demo_url
 *                  video_url: video_url
 *                  creat_time: 2023-1-1
 */
  app.get('/getallprojectinfo', (req, res) => {
    db.query('SELECT * FROM project', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
/**
 * @swagger
 * /getprojectinfobyid:
 *   get:
 *     summary: Get a projectInfo of projects by Id
 *     description: Retrieve a projectInfo of projectlist from the database.
 *     responses:
 *       200:
 *         description: A projectInfo.
 *         content:
 *           application/json:
 *             example:
 *                - id: 1
 *                  candidate_id: 1
 *                  team_id: 1
 *                  trace_id: 1
 *                  name: competitionprotocol
 *                  logo: ipfs.io
 *                  brand: aaaaa
 *                  introduction: This is a introduction
 *                  git_hub_url: https://github.com/DankFang
 *                  twitter_url: DankFang
 *                  telegram_url: telegram_url
 *                  discord_url: discord_url
 *                  demo_url: demo_url
 *                  video_url: video_url
 *                  creat_time: 2023-1-1
 */
  app.get('/getprojectinfobyid/:id', (req, res) => {
    const projectId = req.params.id;
    db.query('SELECT * FROM project WHERE id = ?', [projectId], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ message: 'project not found' });
      }
    });
  });
  
  app.put('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const { candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url,creat_time } = req.body;
    db.query('UPDATE project SET candidate_id = ?,team_id = ?,trace_id = ?,name = ?,logo = ?,brand = ?,introduction = ?,git_hub_url = ?,twitter_url = ?,telegram_url = ?,discord_url = ?,demo_url = ?,video_url = ?,creat_time = ?', [candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url,creat_time], (err, result) => {
      if (err) throw err;
      // 如果被影响的行数>0
      if (result.affectedRows > 0) {
        res.json({ id: userId, name, email });
      } else {
        res.status(404).json({ message: 'project not found' });
      }
    });
  });
  
  app.delete('/project/:id', (req, res) => {
    const projectId = req.params.id;
    db.query('DELETE FROM project WHERE id = ?', [projectId], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({ message: 'project deleted successfully' });
      } else {
        res.status(404).json({ message: 'project not found' });
      }
    });
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
