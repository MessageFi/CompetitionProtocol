const express = require('express');
const router = express.Router();
const db = require('../db/db');

/**
 * @swagger
 * /addtrace:
 *   post:
 *     summary: 添加赛道信息
 *     description: 向数据库中插入赛道信息。
 *     tags:
 *       - Trace
 *     requestBody:
 *       description: 赛道信息对象
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 赛道名称
 *               detail:
 *                 type: string
 *                 description: 赛道详情
 *               competition_id:
 *                 type: integer
 *                 description: 关联的竞赛ID
 *               prizes:
 *                 type: string
 *                 description: 奖品信息
 *               winners:
 *                 type: string
 *                 description: 获奖者信息
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 description: 赛道开始时间
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 description: 赛道结束时间
 *     responses:
 *       201:
 *         description: 成功添加赛道信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: 新添加赛道信息的ID
 *       400:
 *         description: 无效的输入数据
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 错误信息
 */
router.post('/addtrace', (req, res) => {
    const { name, detail, competition_id, prizes, winners, start_time, end_time } = req.body;

    // 转换日期时间格式
    const formattedStartTime = new Date(start_time).toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndTime = new Date(end_time).toISOString().slice(0, 19).replace('T', ' ');

    db.query(
        'INSERT INTO trace (name, detail, competition_id, prizes, winners, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, detail, competition_id, prizes, winners, formattedStartTime, formattedEndTime],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: 'Invalid input data' });
            } else {
                res.status(201).json({ id: result.insertId });
            }
        }
    );
});


/**
 * @swagger
 * /gettracedata:
 *   get:
 *     summary: 获取trace表的所有数据
 *     description: Endpoint to retrieve trace data from the database.
 *     tags:
 *       - Trace
 *     responses:
 *       200:
 *         description: Successfully retrieved trace data
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Trace'
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 * definitions:
 *   Trace:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID of the trace
 *       name:
 *         type: string
 *         description: The name of the trace
 *       detail:
 *         type: string
 *         description: Details about the trace
 *       competition_id:
 *         type: integer
 *         description: ID of the competition
 *       prizes:
 *         type: string
 *         description: Prizes for the trace
 *       winners:
 *         type: string
 *         description: Winners of the trace
 *       start_time:
 *         type: string
 *         format: date-time
 *         description: Start time of the trace
 *       end_time:
 *         type: string
 *         format: date-time
 *         description: End time of the trace
 */
router.get('/gettracedata', (req, res) => {
    db.query('SELECT * FROM trace', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(200).json(result);
        }
    });
});

/**
 * @swagger
 * /gettracebyid/{id}:
 *   get:
 *     summary: 根据id查询trace表的某条数据
 *     description: Endpoint to retrieve a trace by its ID from the database.
 *     tags:
 *       - Trace
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trace to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved trace by ID
 *         schema:
 *           $ref: '#/definitions/Trace'
 *       404:
 *         description: Trace not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 */
router.get('/gettracebyid/:id', (req, res) => {
    const traceId = req.params.id;

    db.query('SELECT * FROM trace WHERE id = ?', [traceId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Trace not found' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
});

/**
 * @swagger
 * /updatetrace/{id}:
 *   put:
 *     summary: 更新赛道信息
 *     description: 根据提供的赛道ID更新数据库中的赛道信息。
 *     tags:
 *       - Trace
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 要更新的赛道信息的ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: 更新后的赛道信息对象
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 新的赛道名称
 *               detail:
 *                 type: string
 *                 description: 新的赛道详情
 *               competition_id:
 *                 type: integer
 *                 description: 新的关联竞赛ID
 *               prizes:
 *                 type: string
 *                 description: 新的奖品信息
 *               winners:
 *                 type: string
 *                 description: 新的获奖者信息
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 description: 新的赛道开始时间
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 description: 新的赛道结束时间
 *     responses:
 *       200:
 *         description: 赛道信息更新成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 更新成功消息
 *       404:
 *         description: 未找到指定ID的赛道信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 未找到赛道信息的消息
 *       500:
 *         description: 服务器内部错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 服务器内部错误消息
 */
router.put('/updatetrace/:id', (req, res) => {
    const traceId = req.params.id;
    const { name, detail, competition_id, prizes, winners, start_time, end_time } = req.body;

    // 转换日期时间格式
    const formattedStartTime = new Date(start_time).toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndTime = new Date(end_time).toISOString().slice(0, 19).replace('T', ' ');

    db.query(
        'UPDATE trace SET name = ?, detail = ?, competition_id = ?, prizes = ?, winners = ?, start_time = ?, end_time = ? WHERE id = ?',
        [name, detail, competition_id, prizes, winners, formattedStartTime, formattedEndTime, traceId],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Trace not found' });
                } else {
                    res.status(200).json({ message: 'Trace updated successfully' });
                }
            }
        }
    );
});


/**
 * @swagger
 * /deletetrace/{id}:
 *   delete:
 *     summary: 根据id删除数据
 *     description: Endpoint to delete a trace by its ID from the database.
 *     tags:
 *       - Trace
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trace to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Trace deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Success message
 *       404:
 *         description: Trace not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Error message
 */
router.delete('/deletetrace/:id', (req, res) => {
    const traceId = req.params.id;

    db.query('DELETE FROM trace WHERE id = ?', [traceId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Trace not found' });
            } else {
                res.status(200).json({ message: 'Trace deleted successfully' });
            }
        }
    });
});
module.exports = router;