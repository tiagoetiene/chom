var utils = require('../libs/utils')
var fs = require('fs');
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-l, --close', 'close database on exit', false )
	.option( '-o, --collection [name]', 'name of the collection to read from' )
	.option( '-r, --credentials [json]', 'json file containing the twitter credentials' )
	.option( '-c, --config [type]', 'configuration file that may include one or more command show in this menu' )
	.option( '-f, --first [number]', 'retrieve the first [number] items', parseInt )
	.option( '-g, --group [group]', 'group to be used', 0, parseInt )
	.option( '-t, --stream', 'stream the latest tweets from Twitter servers' )
	.option( '-e, --search [tweetID]', 'Search for past tweets', 0 )
	.option( '-t, --twitter-screen-names [user_1,user_2,...]', 'Retrieve the user screen names', utils.parserList, []  )
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

if( program.credentials ) {
	var params = JSON.parse( fs.readFileSync( program.credentials ) );
	_.each( params, function( value, key ) {
		program[ key ] = value;
	} );	
}
