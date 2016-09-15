const mysql = require('mysql');

var connection = mysql.createPool({
	host: 'mysql.yancyportfolio.com',
	user: 'yancyshmancy',
	password: 'Leona123',
	database: 'sidegig',
	multipleStatements: true
});

module.exports = connection;