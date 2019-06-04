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

var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');

/*
var index_html = fs.readFileSync('./public/index.html');
var index_js = fs.readFileSync('./public/index.js');
var style_css = fs.readFileSync('./public/style.css');
var html_404 = fs.readFileSync('./public/404.html');
*/

/* IMPLEMENT A TEMPORARY STATICALLY SERVED SERVER SERVICE SERVING STATIC SERVER SERVICES (lol) */

var app = express();
var port = process.env.PORT || 6009;

app.use(express.static('public'));

app.get('*', function (req, res) {
	res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, function () {
	console.log("== Server is listening on port", port);
});