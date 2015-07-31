var _ 		= require( 'underscore' );
var Twit  = require( 'twit' );
var utils = require( '../libs/utils' );
var dns		= require( 'dns' );

var streaming;

module.exports = {
	start : function( keywords, lang, callback ) {

		setInterval( function atEachInterval() {

			if( streaming === true ) {
				return;
			}
			
			streaming = true;

			dns.resolve( 'www.google.com', function( err ) {

				if ( err ) {
					streaming = false;
					process.stderr.write( err );
					return;
				}
				
				//
				// If no credentials were passed as input,
				// then lookup the database
				//
				credentials = utils.getCredential();

				//
				// If no credentials were found, then return
				//
				if( _.isEmpty( credentials ) ) {
					process.stderr.write( "* There are no credentials available\n" );
					process.stderr.write( "  Please add new credentials using:\n");
					process.stderr.write( "     chom credentials add\n");
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