var Twit = require("twit");
var _ = require( "underscore" );
var args = require( "./args" );

var inputCertificate = program.certificate;

var T;

missingTweets = function( tweets, callback ) {

	//
	// If no authentication exists, create one
	//
	if( !T ) {
		T = new Twit( inputCertificate );
	}

	//
	// Retrieving the ids from all input tweets
	//
	var ids = "";
	_.each( tweets, function( tweet ) {
	 	ids += tweet.user.id + "," 
	} );


	T.post( "users/lookup", { user_id : ids }, function(err, data, response) {
		if( err )
			throw err;
	
		var missing = [];
		_.each( tweets, function( tweet ) {

			var found = false;

			//
			// Looking for the tweet.id_str in the return set
			//
			for( var i = 0; i < data.length; ++i ) {
				if( _.isEqual(  tweet.user.id, data[ i ].id ) ) {
					found = true;
					break;
				}
			}
			
			//
			// If not found, then return it
			//
			if( found == false ) {
				missing.push( tweet );
			}
		} );

		callback.call( this, missing );
		
	});
}