require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'bu0wbum5m47d9yljo0pq-mysql.services.clever-cloud.com',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'uum6j3dlum69oys5',
    password: process.env.DB_PASSWORD || '63qqa3gSlfT9s0RasQOm',
    database: process.env.DB_NAME || 'bu0wbum5m47d9yljo0pq',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;