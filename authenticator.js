const CryptoJS = require('crypto-js');
const bodyParser = require('body-parser');
const validator = require('email-validator');
const connection = require('./mysql-config');

module.exports = function(req, res, next) {
	var username = req.body.username;
	var password = CryptoJS.MD5(JSON.stringify(req.body.password), 'abc1234');
	
	if (validator.validate(username)) {
		
		connection.query('SELECT * FROM users WHERE email="'+username+'"', function(err, result) {
			
			if (err) {
				console.log(err);
				res.send(err).status(400);
			} else {
				user = result[0];
				
				if (user.password == password) {
					req.session.email = user.email;
					req.session.firstname = user.firstname;
					req.session.lastname = user.lastname;
					req.session.username = user.username;
					req.session.save();
				} else {
					res.send("Incorrect username or password").status(400);
				}
			}
		});
		
		return next();
	} else if (username) {
		
		connection.query('SELECT * FROM users WHERE username="'+username+'"', function(err, result) {
			
			if (err) {
				res.send(err).status(400);
			} else {
				user = result[0];
				
				if (user.password == password) {
					req.session.email = user.email;
					req.session.firstname = user.firstname;
					req.session.lastname = user.lastname;
					req.session.username = user.username;
					req.session.save();
//					res.send(req.session);
				} else {
					res.send("Incorrect username or password").status(400);
				}
			}
		});
		
		return next();
	}
	
	console.log('not logged in');
	res.send('Not logged in').status(400);
}