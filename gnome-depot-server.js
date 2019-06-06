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


app.get('/', function (req, res, next) {

	res.status(200).render('partials/home');
  
});

app.get('/products', function (req, res, next) {

	res.status(200).render('partials/toolsPage');
  
});

app.get('*', function (req, res) {
	res.status(404).render('partials/404');
  });

app.listen(port, function () {
	console.log("== Server is listening on port", port);
});