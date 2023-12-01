const mysql = require("mysql"); 
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
module.exports = db;