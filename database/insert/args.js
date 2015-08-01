var utils = require( '../../libs/utils' );
var fs = require( 'fs' );
program = require( 'commander' );

program
	.version( '0.0.1' )
	.option( '-m, --mongo_url [name]', 'url to mongodb' )
	.option( '-c, --collection [name]', 'name of the collection to be saved to' )
	.option( '-s, --save-interval [milliseconds]', 'timeinterval used to save bulk data', 10000, parseInt )
	.option( '-i, --simulate', 'do not save to database, only simulate', false, false )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}
