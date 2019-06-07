/*
 * The Gnome Depot opens its port to all shoppers ;)
 *
 * [gnome-depot-server.js]
 *
 * THIS PROGRAM IS PROPRIETARY CONTENT OF THE AUTHORS THAT FOLLOW.
 *
 * name:Lyell Read
 * email:readly@oregonstate.edu
 *
 * name:Michael Boly
 * email:bolym@oregonstate.edu
 *
 * name:Scott Richards
 * email:richarsc@oregonstate.edu
 *
 * DO NOT COPY OUR CODE, WRITE YOUR OWN, *******!
 */

/* Some Generic Requires*/
var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
/* Express & Handlebars */
var express = require('express');
var exphbs = require('express-handlebars');

/* Configure the server */
var app = express();
var port = process.env.PORT || 6009;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

console.log("mongoUrl: ", mongoUrl);


app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());

/* APP.GET */

app.get('/', function (req, res, next) {

	res.status(200).render('partials/home');

});

app.get('/products', function (req, res, next) {

	res.status(200).render('partials/toolsPage');

});

app.get('/login', function (req, res, next) {

	res.status(200).render('partials/login');

});

app.get('*', function (req, res) {
	res.status(404).render('partials/404');
  });

/* APP.POST*/


app.post('/useradd', function (req, res){
	if (req.body && req.body.username && req.body.passHash){
		console.log("== Recieved POST for AuthAdd:");
		console.log(" - Username: " + req.body.username);
		console.log(" - PassHash: " + req.body.passHash);

		// ADD UN, PASS TO DB HERE
		var credentials = db.collection('credentials');
		var usersCursor = credentials.find({
  		username: req.body.username
		});

		usersCursor.next(function (err, userDoc) {
  	if (err) {
    	res.status(500).send("Error fetching user from DB.");
  	} else if (!userDoc) {
			console.log("User no existo");
  	} else {
	    console.log("User does exist");
  	}
	});


		// if(usersCursor.next() === null){
		// 	//ADD USER TO DATABASE
		// 	credentials.insertOne({
		// 		username: req.body.username,
		// 		password: req.body.passHash
		// 	});
		// } else {
		// 	console.log("== User Already Exists. ERRORING!");
		// 	res.status(400).send("User Already Exists");
		// }

		// COMPLETE THE PROCESS HERE

		res.status(200).send("Successfully Added.");

	}

	else {
		console.log("== Recieved Incomplete POST. ERRORING!");
		res.status(400).send("Requests to this path must " +
      		"contain a JSON body with username and password hash " +
       		"fields.");
	}
});

app.post('/userauth', function (req, res){
	if (req.body && req.body.username && req.body.passHash){
		console.log("== Recieved POST for UserAuth:");
		console.log(" - Username: " + req.body.username);
		console.log(" - PassHash: " + req.body.passHash);

		// CHECK USERNAME & PASSWORD IN DB HERE
		var credentials = db.collection('credentials');
		var success = 1;
		var usersCursor = credentials.find({
  		'username': req.body.username,
			'password': req.body.passHash
		});

		console.log("usersCursor: ", usersCursor.next());

		if(!usersCursor){
			success = 0;
			console.log("== Invalid Username Or Password");
			res.status(400).send("Invalid Username Or Password.");
		}

		// COMPLETE THE PROCESS HERE

		if (success){
			console.log("== Sending Auth Success");
			res.status(200).send("Successfully Added.");
		}

		else{
			console.log("== Sending Auth Failure");
			res.status(400).send("Authentication Failure.");
		}
	}

	else {
		console.log("== Recieved Incomplete POST. ERRORING!");
		res.status(400).send("Requests to this path must " +
      		"contain a JSON body with username and password hash " +
       		"fields.");
	}
});

/* APP.LISTEN */

MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
	app.listen(port, function () {
		console.log("== Server is listening on port", port);
	});
});
