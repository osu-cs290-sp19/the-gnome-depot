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

 var signupAcceptButton = document.getElementById('signupAcceptButton');
 signupAcceptButton.addEventListener('click', function (event){

 	var username = document.getElementById('signupUsername').value;
 	var passHash = document.getElementById('signupPassword').value;

 	postSignupCredentials(username, passHash);

 })

  var loginAcceptButton = document.getElementById('loginAcceptButton');
 loginAcceptButton.addEventListener('click', function (event){

 	var username = document.getElementById('loginUsername').value;
 	var passHash = document.getElementById('loginPassword').value;

 	postLoginCredentials(username, passHash);

 })

 function postSignupCredentials(username, passHash){

	console.log("== Called postSignupCredentials:");
	console.log(" - username:" + username);
	console.log(" - password:" + passHash);


 	var request = new XMLHttpRequest();
 	request.open('POST', '/useradd');

 	var credentials = {
 		username:username,
 		passHash:passHash

 	};

 	var requestBody = JSON.stringify(credentials);

 	request.setRequestHeader('Content-Type', 'application/json');

 	/* fix load below */
 	request.addEventListener('load', function (event) {
		if (event.target.status !== 200) {

	    	var message = event.target.response;
	    	alert("Error storing credentials in database: " + message);

	 	} else {
		    
	 		postLoginCredentials(username, passHash);
		}
	});

	request.send(requestBody);
	return;
}

function postLoginCredentials (username, passHash){

	console.log("== Called postLoginCredentials:");
	console.log(" - username:" + username);
	console.log(" - password:" + passHash);

	var request = new XMLHttpRequest();
 	request.open('POST', '/userauth');

 	var credentials = {
 		username:username,
 		passHash:passHash

 	};

 	var requestBody = JSON.stringify(credentials);

 	request.setRequestHeader('Content-Type', 'application/json');

 	/* fix load below */
 	request.addEventListener('load', function (event) {
		if (event.target.status !== 200) {

	    	var message = event.target.response;
	    	console.log("== Auth Failure.")
	    	alert("Invalid Username || Password. Try Again. Message: " + message);

	 	} else {
		    
	 		console.log("== Auth Success.")

	 		/* do this on succ auth */
		}
	});

	request.send(requestBody);
	return;
}