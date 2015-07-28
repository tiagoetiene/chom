var _ 		= require( "underscore" );
var utils = require('../libs/utils');
var dns		= require('dns');

var streaming;


module.exports = {
	start : function( keywords, lang, credentials, callback ) {
		setInterval( function atEachInterval() {

			if( streaming === true ) {
				return;
			}

			dns.resolve( 'www.google.com', function(err) {

				if ( err ) {
					streaming = false;
					return;
				}

				streaming = true;
				
				//
				// If no credentials were passed as input,
				// then lookup the database
				//
				if( _.isUndefined( credentials ) ) {
					credentials = utils.getCredential();
				}

				//
				// If no credentials were found, then return
				//
				if( _.isEmpty( credentials ) ) {
					return;
				}

				//
				// Connecting to twitter
				//
				var T = new Twit( credentials );

				//
				// Starting stream of tweets
				//
				var stream = T.stream( "statuses/filter", { track: keywords, language: lang });

				//
				// Starting stream
				//
				stream.on( "tweet", callback );
				stream.on( "error", function( err ) { stream.stop(); } );


			} );
		}, 1000 );
	}
}