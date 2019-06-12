/*
 * The Gnome Depot opens its port to all shoppers ;)
 *
 * [index.js]
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

 // check if tools have been emptied, aka stolen via XSS, 
 // then load screen with gnomes out of box
 // Gnome: Thanks for freeing me. 
 // You've been Gnomed! 

 // ^Thats dank lol.


var button = document.getElementById("navbar-search-button");
var input = document.getElementsByClassName("navbar-search")[0];

input.addEventListener("keyup", function(event){
	console.log("THis is happening");
	if(event.keyCode === 13){
		event.preventDefault();
		button.click();
	}
});


button.addEventListener("click", handleSearch);

function handleSearch() {
	var searchInput = document.getElementsByClassName("navbar-search")[0].value.trim();
	console.log("search input: ", searchInput);

	window.location.assign("/search/" + searchInput);

}
