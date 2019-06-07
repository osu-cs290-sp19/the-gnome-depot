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
/* Express & Handlebars */
var express = require('express');
var exphbs = require('express-handlebars');

/* Configure the server */
var app = express();
var port = process.env.PORT || 6009;

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
		console.log("== Recieved POST:");
		console.log(" - Username: " + req.body.username);
		console.log(" - PassHash: " + req.body.passHash);

		// ADD UN, PASS TO DB HERE

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

/* APP.LISTEN */

app.listen(port, function () {
	console.log("== Server is listening on port", port);
});