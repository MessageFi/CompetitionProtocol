const mysql = require("mysql");

const dbConfig = {
    host :"127.0.0.1",
    user :"root",
    password: "fyh0812",
    // password :"Cp@123456",
    database: "competitionprotocol"
};
const pool = mysql.createPool({
    connectionLimit: 10,
    ...dbConfig
});

function connectToDatabase() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            // 连接失败，等待5秒后尝试重新连接
            setTimeout(connectToDatabase, 5000);
            return;
        }

        console.log('Connected to database');
        // 释放连接回连接池
        connection.release();
    });
}

// 处理连接丢失的事件
pool.on('error', (err) => {
    console.error('Database Pool Error: ' + err.stack);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // 重新连接
        connectToDatabase();
    } else {
        throw err;
    }
});

function query(sql, values, callback) {
  pool.getConnection((err, connection) => {
      if (err) {
          console.error('Error acquiring connection: ' + err.stack);
          return callback(err);
      }

      connection.query(sql, values, (err, results) => {
          connection.release(); // 释放连接回连接池

          if (err) {
              console.error('Error executing query: ' + err.stack);
              return callback(err);
          }

          callback(null, results);
      });
  });
}

module.exports = {
  connectToDatabase,
  query
};
