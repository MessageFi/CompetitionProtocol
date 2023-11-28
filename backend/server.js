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
    password :"123456",
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
/**
 * @swagger
 * /addproject:
 *   post:
 *     summary: Add a new project
 *     description: Add a new project to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidate_id:
 *                 type: integer
 *               team_id:
 *                 type: integer
 *               trace_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               brand:
 *                 type: string
 *               introduction:
 *                 type: string
 *               git_hub_url:
 *                 type: string
 *               twitter_url:
 *                 type: string
 *               telegram_url:
 *                 type: string
 *               discord_url:
 *                 type: string
 *               demo_url:
 *                 type: string
 *               video_url:
 *                 type: string
 *             required:
 *               - candidate_id
 *               - team_id
 *               - trace_id
 *               - name
 *               - logo
 *               - brand
 *               - introduction
 *               - git_hub_url
 *               - twitter_url
 *               - telegram_url
 *               - discord_url
 *               - demo_url
 *               - video_url
 *     responses:
 *       201:
 *         description: Project added successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *       400:
 *         description: Bad Request - Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid input data
 */
  app.post('/addproject', (req, res) => {
    const creat_time = new Date();
    const { candidate_id, team_id, trace_id, name, logo, brand, introduction, git_hub_url, twitter_url, telegram_url, discord_url, demo_url, video_url } = req.body;
    db.query('INSERT INTO project (candidate_id, team_id, trace_id, name, logo, brand, introduction, git_hub_url, twitter_url, telegram_url, discord_url, demo_url, video_url, creat_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [candidate_id, team_id, trace_id, name, logo, brand, introduction, git_hub_url, twitter_url, telegram_url, discord_url, demo_url, video_url, creat_time], (err, result) => {
        if (err) {
            res.status(400).json({ message: 'Invalid input data' });
        } else {
            res.status(201).json({ id: result.insertId });
        }
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
 * /getprojectinfobyid/{id}:
 *   get:
 *     summary: Get project information by ID
 *     description: Retrieve project information from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to retrieve information
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project information retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 candidate_id: 123
 *                 team_id: 456
 *                 trace_id: 789
 *                 name: ProjectName
 *                 logo: project_logo_url
 *                 brand: project_brand
 *                 introduction: project_introduction
 *                 git_hub_url: project_github_url
 *                 twitter_url: project_twitter_url
 *                 telegram_url: project_telegram_url
 *                 discord_url: project_discord_url
 *                 demo_url: project_demo_url
 *                 video_url: project_video_url
 *                 creat_time: project_creation_time
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             example:
 *               message: project not found
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

/**
 * @swagger
 * /project/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Update an existing project in the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidate_id:
 *                 type: integer
 *               team_id:
 *                 type: integer
 *               trace_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               brand:
 *                 type: string
 *               introduction:
 *                 type: string
 *               git_hub_url:
 *                 type: string
 *               twitter_url:
 *                 type: string
 *               telegram_url:
 *                 type: string
 *               discord_url:
 *                 type: string
 *               demo_url:
 *                 type: string
 *               video_url:
 *                 type: string
 *             required:
 *               - candidate_id
 *               - team_id
 *               - trace_id
 *               - name
 *               - logo
 *               - brand
 *               - introduction
 *               - git_hub_url
 *               - twitter_url
 *               - telegram_url
 *               - discord_url
 *               - demo_url
 *               - video_url
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               candidate_id: 123
 *               team_id: 456
 *               trace_id: 789
 *               name: UpdatedProject
 *               logo: updated_logo_url
 *               brand: updated_brand
 *               introduction: updated_introduction
 *               git_hub_url: updated_github_url
 *               twitter_url: updated_twitter_url
 *               telegram_url: updated_telegram_url
 *               discord_url: updated_discord_url
 *               demo_url: updated_demo_url
 *               video_url: updated_video_url
 *               creat_time: "2023-12-01T12:00:00Z"
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             example:
 *               message: project not found
 */
  app.put('/project/:id', (req, res) => {

    const creat_time = new Date();

    console.log(creat_time);
    const projectId = req.params.id;
    const { candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url } = req.body;
    db.query('UPDATE project SET candidate_id = ?,team_id = ?,trace_id = ?,name = ?,logo = ?,brand = ?,introduction = ?,git_hub_url = ?,twitter_url = ?,telegram_url = ?,discord_url = ?,demo_url = ?,video_url = ?,creat_time = ? WHERE id = ?', [candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url,creat_time,projectId], (err, result) => {
      if (err) throw err;
      // 如果被影响的行数>0
      if (result.affectedRows > 0) {
        res.json({ id: projectId,candidate_id,team_id,trace_id,name,logo,brand,introduction,git_hub_url,twitter_url,telegram_url,discord_url,demo_url,video_url,creat_time });
      } else {
        res.status(404).json({ message: 'project not found' });
      }
    });
  });
  
/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Delete an existing project from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: project deleted successfully
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             example:
 *               message: project not found
 */
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
    console.log(`Server is running on http://localhost:3000  api doc is http://127.0.0.1:3000/api-docs/`);
  });
