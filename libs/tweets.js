var Twit = require("twit");
var _ = require( "underscore" );
var inputCertificate = program.certificate;

var T;

usersLookup = function( T, requestType, users, callback ) {

	//
	// Retrieving the ids from all input tweets
	//
	var userListBulks = [];
	var usersList = "";
	var counter = 0;
	_.each( users, function( user ) {
		if( _.isEmpty( user ) == false ) {
	 		usersList += user + "," 
	 		counter++;
		}
	 	if( counter == 100 ) {
	 		userListBulks.push( usersList.substring( 0 ) );
	 		usersList = "";
	 		counter = 0;
	 	}
	} );
	userListBulks.push( usersList );
	

	var bulk = 0;
	var working = false;
	var handle = setInterval( function() {

		if( bulk >= userListBulks.length ) {
			clearInterval( handle );
		}

		if( !working ) {

			working = true;

			var options = {};
			options[ requestType ] = userListBulks[ bulk ];

			process.stderr.write( JSON.stringify( userListBulks[ bulk ] ) + "\n");
			T.post( "users/lookup", options, function(err, data, response) {
				if( err ) {
					throw err;
				}

				bulk++;
				working = false;
				callback.call( this, data );

			} );	
		}		
	}, 15000 );
	
}