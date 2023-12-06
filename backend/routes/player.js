const express = require('express');
const router = express.Router();
const { connectToDatabase, query } = require('../db/db');
connectToDatabase();


/**
 * @swagger
 *
 * /addplayer:
 *   post:
 *     summary: Add a new player to the database.
 *     description: |
 *       Adds a new player to the MySQL database table 'player'.
 *     tags:
 *       - Player
 *     requestBody:
 *       description: Player information to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: The nickname of the player.
 *               avatar:
 *                 type: string
 *                 description: The avatar of the player.
 *               address:
 *                 type: string
 *                 description: The address of the player.
 *               labels:
 *                 type: string
 *                 description: Labels associated with the player.
 *               email:
 *                 type: string
 *                 description: The email address of the player.
 *     responses:
 *       '201':
 *         description: Successfully added a new player.
 *         content:
 *           application/json:
 *             example:
 *               id: 123
 *       '400':
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid input data
 */
router.post('/addplayer', (req, res) => {
    const create_time = new Date();
    const { nickname, avatar, address, labels, email } = req.body;
    
    query('INSERT INTO player (nickname, avatar, address, labels, email, create_time) VALUES (?, ?, ?, ?, ?, ?)',
        [nickname, avatar, address, labels, email, create_time], (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({ message: 'Invalid input data' });
            } else {
                res.status(201).json({ id: result.insertId });
            }
        });

});

/**
 * @swagger
 *
 * /getplayers:
 *   get:
 *     summary: Get all players from the database.
 *     description: |
 *       Retrieves all player records from the MySQL database table 'player'.
 *     tags:
 *       - Player
 *     responses:
 *       '200':
 *         description: Successfully retrieved all players.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nickname: "Player1"
 *                 avatar: "avatar1.jpg"
 *                 address: "Address1"
 *                 labels: "Label1,Label2"
 *                 email: "player1@example.com"
 *                 create_time: "2023-12-01T12:34:56.789Z"
 *               - id: 2
 *                 nickname: "Player2"
 *                 avatar: "avatar2.jpg"
 *                 address: "Address2"
 *                 labels: "Label3,Label4"
 *                 email: "player2@example.com"
 *                 create_time: "2023-12-02T12:34:56.789Z"
 *               # Add more player records as needed
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get('/getplayers', (req, res) => {
    query('SELECT * FROM player', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(200).json(results);
        }
    });
});

/**
 * @swagger
 *
 * /getplayer/{id}:
 *   get:
 *     summary: Get a player by ID.
 *     description: |
 *       Retrieves a player record from the MySQL database table 'player' based on the provided ID.
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the player to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved the player.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               nickname: "Player1"
 *               avatar: "avatar1.jpg"
 *               address: "Address1"
 *               labels: "Label1,Label2"
 *               email: "player1@example.com"
 *               create_time: "2023-12-01T12:34:56.789Z"
 *       '404':
 *         description: Player not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Player not found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.get('/getplayer/:id', (req, res) => {
    const playerId = req.params.id;

    query('SELECT * FROM player WHERE id = ?', [playerId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Player not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
});

/**
 * @swagger
 * /updateplayer/{id}:
 *   put:
 *     summary: Update a player's information
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player to be updated
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               avatar:
 *                 type: string
 *               address:
 *                 type: string
 *               labels:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - nickname
 *               - avatar
 *               - address
 *               - labels
 *               - email
 *     responses:
 *       '200':
 *         description: Player information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated player
 *                 nickname:
 *                   type: string
 *                   description: The updated nickname
 *                 avatar:
 *                   type: string
 *                   description: The updated avatar
 *                 address:
 *                   type: string
 *                   description: The updated address
 *                 labels:
 *                   type: string
 *                   description: The updated labels
 *                 email:
 *                   type: string
 *                   description: The updated email
 *                 create_time:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp of the update
 *       '404':
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the player was not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating an internal server error
 */
router.put('/updateplayer/:id', (req, res) => {
    const playerId = req.params.id;
    const { nickname, avatar, address, labels, email } = req.body;
    const create_time = new Date();
    query(
        'UPDATE player SET nickname=?, avatar=?, address=?, labels=?, email=?, create_time=? WHERE id=?',
        [nickname, avatar, address, labels, email, create_time, playerId],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Player not found' });
            } else {
                // res.status(200).json({ id: playerId, ...req.body });
                res.status(200).json({ id: playerId, nickname, avatar, address, labels, email, create_time });
            }
        }
    );
});

/**
 * @swagger
 *
 * /deleteplayer/{id}:
 *   delete:
 *     summary: Delete a player by ID.
 *     description: |
 *       Deletes a player record from the MySQL database table 'player' based on the provided ID.
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the player to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Successfully deleted the player.
 *       '404':
 *         description: Player not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Player not found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */
router.delete('/deleteplayer/:id', (req, res) => {
    const playerId = req.params.id;

    query('DELETE FROM player WHERE id = ?', [playerId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Player not found' });
        } else {
            res.status(204).send();
        }
    });
});
module.exports = router;