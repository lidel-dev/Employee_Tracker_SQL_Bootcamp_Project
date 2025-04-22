const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "12345",
    database: "buisness_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;