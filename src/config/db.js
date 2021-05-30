const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DBS,
    // password:process.env.PASS
});

module.exports = connection;