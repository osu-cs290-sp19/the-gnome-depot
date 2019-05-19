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

var index_html = fs.readFileSync('./public/index.html');
var index_js = fs.readFileSync('./public/index.js');
var style_css = fs.readFileSync('./public/style.css');
var html_404 = fs.readFileSync('./public/404.html');


function requestHandler (request, response) {
	
	if (request.url === '/index.html' || request.url === '/'){
		
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/html');
		response.write(index_html);
		response.end();
		return;
	}
	
	else if (request.url === '/index.js'){
		
		response.statusCode = 200;
		response.setHeader('Content-Type', 'application/javascript');
		response.write(index_js);
		response.end();
		return;
	}
	
	else if (request.url === '/style.css'){
		
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/css');
		response.write(style_css);
		response.end();
		return;
	}
	
	else {
		
		response.statusCode = 404;
		response.setHeader('Content-Type', 'text/html');
		response.write(html_404);
		response.end();
		return;	
	}
}

var server = http.createServer(requestHandler);
var port = (process.env.PORT || 6969);
server.listen(port, function(){console.log("== Started; Listening on:", port);});
