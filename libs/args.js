var program = require('commander');

program
	.version( '0.0.1' )
	.option( '--twitter-max-id', 'Maximum tweet id acceptable when retrieving data ' )
	.option( '--search [max_id]', 'Search for past tweets', false )
	.option( '--stream', 'Stream the latest tweets' )
	.option( '-m, --min [tweet_field]', 'Find the minimum value of a set' )
	.option( '-M, --max [tweet_field]', 'Find the maximum value of a set ' )
	.option( '-c, --config [type]', 'Config file' )
	.parse( process.argv );

params = {};
if( program.config ) {
	params = require( "../" + program.config );
}

if( program.min ) {
	params[ "min" ] = program.min;
}

if( program.max ) {
	params[ "max" ] = program.max;
}

if( program.search ) {
	params[ "search" ] = program.search;
}

if( program.stream ) {
	params[ "stream" ] = program.stream;
}