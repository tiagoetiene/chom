var fs = require('fs');
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-o, --collection [name]', 'name of the collection to read from' )
	.option( '-c, --config [type]', 'configuration file that may include one or more command show in this menu' )
	.option( '-t --stream', 'stream the latest tweets from Twitter servers' )
	.option( '-e --search [tweetID]', 'Search for past tweets', 0 )
	.option( '--close', 'close database on exist', false )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}

if( program.config ) {
	var params = JSON.parse( fs.readFileSync( program.config ) );
	_.each( params, function( value, key ) {
		program[ key ] = value;
	} );
}
