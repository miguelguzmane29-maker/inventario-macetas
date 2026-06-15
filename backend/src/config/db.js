const mysql = require("mysql2");

require("dotenv").config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

connection.getConnection((err, conn) => {

    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }

    console.log("Base de datos conectada");

    conn.release();

});

module.exports = connection;