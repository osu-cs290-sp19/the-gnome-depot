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
var prompt = require('prompt-sync')();

var images = []

/* Credit : https://code-maven.com/list-content-of-directory-with-nodejs */

fs.readdir(".", function(err, items) {
    //console.log(items);
 	//console.log(items.length);

    for (var i=0; i<items.length; i++) {
    	

    	if (items[i].search(".jpg") !== -1){
        	
        	console.log("Image: ", items[i]);

        	var name = prompt("Name:");
			var price ="$" +  prompt("Price:");
			var quantity = prompt("Quantity:");
			var image_location = "images/tools/" + items[i];

			var object = {
				'name': name,
				'price': price,
				'qty': quantity,
				'img': image_location
			};

			console.log(JSON.stringify(object));

			images.push(object);

			console.log(images);

        }
    }
});

console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
console.log(images);
for (var j = 0; j < images.length; j++){
	fs.appendFile('images.json', JSON.stringify(images[j]), (err) => {  
	    if (err) throw err;
	    console.log('The lyrics were updated!');
	});
}