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

if (!(process.env.MONGO_HOST && process.env.MONGO_USER && process.env.MONGO_PASSWORD && process.env.MONGO_DB_NAME)){
	console.log("#### ERROR FOUND #### - Lacking One Or More Environment Variables!. Quitting.");
	throw noEnvError;
}

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

console.log("mongoUrl: ", mongoUrl);
/* READING TOOLS INTO DATABASE FROM TOOLS_INIT.JSON FILE */
var toolData = fs.readFileSync('tools_init.json', 'utf8');
var parsedData = JSON.parse(toolData);
var toolsArray = [];
var numTools = Object.keys(parsedData).length;

for(var i = 0; i < numTools; i++){
  toolsArray.push(parsedData[i]);
}
/* READING TOOLS FROM JSON FILE */


app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());

/* APP.GET */

app.get('/' , function (req, res, next) {
	/*
	//clear and restck database
  	var tools = db.collection('tools');
  	tools.deleteMany({});
  	tools.insertMany(toolsArray);
	*/
	res.status(200).render('partials/home');

});

/* Technically not need but useful in case someone comes lookin' for index.html */

app.get('/index.html' , function (req, res, next) {

	res.status(200).render('partials/home');

});

app.get('/products', function (req, res, next) {

	var tools = db.collection('tools');
	
	var allToolsCursor = tools.find({});
	allToolsCursor.toArray(function(err, toolDocs){
		if(err){
			res.status(500).send("Error fetching tools from DB.");
		} else {
			console.log("toolDocs: ", toolDocs);
			res.status(200).render('partials/toolsPage', {
           		     toolsArray: toolDocs
        		});
		}
	});

});

app.get('/search/:search', function (req, res, next) {

	var userSearch = req.params.search;
        console.log("userSearch:  ", userSearch);

	var tools = db.collection('tools');
        var toolsFoundCursor = tools.find({$text: {$search: userSearch}});
	console.log("toolsFoundCursor: ", toolsFoundCursor);
        toolsFoundCursor.toArray(function(err, toolDocs){
        	if(err){
                	res.status(500).send("Error fetching searched tools from DB.");
                } else {
                        console.log(toolDocs);
                        res.status(200).render('partials/toolsPage', {
                        	toolsArray: toolDocs
                        });
                }
        });

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
		console.log("== Recieved POST for UserAdd:");
		console.log(" - Username: " + req.body.username);
		console.log(" - PassHash: ", req.body.passHash);

		var credentials = db.collection('credentials');
		credentials.find({username: req.body.username}).toArray(function(err, userData){
		
		if (err) {
	    	res.status(500).send("Error fetching user from DB.");
	  	} 

	  	else if(userData.length < 1){
			var newUser = {
				username: req.body.username,
				password: req.body.passHash
			};
			credentials.insertOne(newUser);

			res.status(200).send("Successfully Added.");
		} 

		else {
			console.log("== User already in database.");
			res.status(400).send("User Already Exists.");
		}});
	}

	else {
		console.log("== Recieved Incomplete POST.");
		res.status(400).send("Incomplete Request");
	}
});

app.post('/userauth', function (req, res){
	if (req.body && req.body.username && req.body.passHash){
		console.log("== Recieved POST for UserAuth:");
		console.log(" - Username: " + req.body.username);
		console.log(" - PassHash: " + req.body.passHash);

		// CHECK USERNAME & PASSWORD IN DB

		var success = 1;

		var credentials = db.collection('credentials');
		credentials.find({username: req.body.username, password: req.body.passHash}).toArray(function(err, userData){
		
		if (err) {
	    	res.status(500).send("Error fetching user from DB.");
	  	} 

	  	else if(userData.length < 1){
			success = 0;
			console.log("== Invalid Username Or Password");
			res.status(400).send("Authentication Failure");
		} 

		else {
			console.log("== User credentials are correct!");
			res.status(200).send("Authentication Success.");
		}});
	}

	else {
		console.log("== Recieved Incomplete POST. ERRORING!");
		res.status(400).send("Incomplete Request.");
	}
});

/* APP.LISTEN */

MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);

  //clear and restck database
  var tools = db.collection('tools');
  tools.deleteMany({});
  tools.insertMany(toolsArray);

  app.listen(port, function () {
	console.log("== Server is listening on port", port);
  });
});
