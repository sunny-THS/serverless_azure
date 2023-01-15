if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();

const mysql = require("mysql");
// const fs = require('fs')

const initSQL = {
    connectDB: mysql.createConnection({
        host: process.env.DB_SERVER_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    }), 
};

module.exports = initSQL;