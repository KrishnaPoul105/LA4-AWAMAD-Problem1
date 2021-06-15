var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'foodlogin'
});
var app = express();
app.use(express.json());


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
	
});
app.get('/order.html', function(request, response) {
	response.sendFile(path.join(__dirname + '/order.html'));
});

app.get('/auth', function(request, response) {
		connection.query('SELECT * FROM user', function(error, results, fields) {
		if (error) 
			throw error; 
				else
					{
						response.send(results);
						
					}
				});
});
app.post('/ord', function(request, response) {
	var username = request.body.username;
	var email = request.body.email;
	var food = request.body.foodname;
	if (username && email&& food) {
		connection.query('INSERT INTO user(username,email,foodname) VALUES (?,?,?)',[username,email,food], function(error, results) {
				if (error) throw error; 
				else
					response.redirect('/');
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	
		//response.send('Welcome back, ' + request.session.username + '!');
		 response.sendFile(path.join(__dirname + '/login.html'));  

	
});

app.listen(3000);