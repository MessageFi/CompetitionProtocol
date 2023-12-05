const express = require('express');
const router = express.Router();
const db = require('../db/db');


/**
 * @swagger
 * /addteam:
 *   post:
 *     summary: Create a new team
 *     tags:
 *       - Team
 *     description: Endpoint to add a new team to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *               leader:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier for the newly created team
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating invalid input data
 */
router.post('/addteam',(req, res) => {
    const create_time = new Date();
    const { name, logo, members, leader } = req.body;
    db.query('INSERT INTO team (name, logo, members, leader, create_time) VALUES (?, ?, ?, ?, ?)', [ name, logo, members, leader, create_time], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ message: 'Invalid input data' });
        } else {
            res.status(201).json({ id: result.insertId });
        }
    });
  })
/**
 * @swagger
 * /getallteaminfo:
 *   get:
 *     summary: 获取所有团队信息
 *     tags:
 *       - Team
 *     responses:
 *       200:
 *         description: 成功获取所有团队信息
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: 团队1
 *                 logo: 团队1的Logo URL
 *                 members: 10
 *                 leader: 1
 *                 creat_time: 2023-12-01
 *               - id: 2
 *                 name: 团队2
 *                 logo: 团队2的Logo URL
 *                 members: 8
 *                 leader: 2
 *                 creat_time: 2023-12-02
 *       500:
 *         description: 服务器内部错误
 */
router.get('/getallteaminfo', (req, res) => {
    // 执行查询所有字段的SQL语句
    const sql = 'SELECT * FROM team';
  
    // 使用db.query执行查询
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  });
/**
 * @swagger
 * /getateaminfo/{id}:
 *   get:
 *     summary: Get information about a team by ID
 *     tags:
 *       - Team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               name: Team Name
 *               logo: Team Logo URL
 *               members: 5
 *               leader: 3
 *               creat_time: 2023-12-01
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/getateaminfo/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT name, logo, members, leader, create_time FROM team WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // 检查查询结果是否为空
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ message: 'Team not found' });
        }
      }
    });
  });
/**
 * @swagger
 * /updateteam/{id}:
 *   put:
 *     summary: Update a team by ID
 *     tags:
 *       - Team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: team
 *         description: Updated team data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             logo:
 *               type: string
 *             members:
 *               type: integer
 *             leader:
 *               type: string
 *             creat_time:
 *               type: string
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/updateteam/:id', (req, res) => {
    const id = req.params.id;
    const creat_time = new Date(); 
    const { name, logo, members, leader } = req.body;
    const sql = 'UPDATE team SET name=?, logo=?, members=?, leader=?, create_time=? WHERE id=?';
    db.query(sql, [name, logo, members, leader, creat_time, id], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // 检查受影响的行数是否大于 0，表示更新成功
        if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Team updated successfully' });
        } else {
          res.status(404).json({ message: 'Team not found' });
        }
      }
    });
  });
/**
 * @swagger
 * /deleteteam/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags:
 *       - Team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/deleteteam/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM team WHERE id=?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        // 检查受影响的行数是否大于 0，表示删除成功
        if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Team deleted successfully' });
        } else {
          res.status(404).json({ message: 'Team not found' });
        }
      }
    });
  });

module.exports = router;
