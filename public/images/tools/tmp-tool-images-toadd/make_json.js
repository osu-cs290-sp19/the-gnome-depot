/*
 * The Gnome Depot opens its port to all shoppers ;)
 *
 * [make_json.js]
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
var prompt = require('prompt');

/* Credit : https://code-maven.com/list-content-of-directory-with-nodejs */

fs.readdir(path, function(err, items) {
    console.log(items);
 
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }
});

