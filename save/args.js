program = require('commander');

function parserList( list ) {
	return list.split(",");
}

program
	.version( '0.0.1' )
	.option( '--keys <list>', "Comma separated list of keys to be used during summarization", parserList )
	.option( '-c, --config [type]', 'Configuration file that may include one or more command show in this menu' )
	.parse( process.argv );

if( program.config ) {
	var params = require( "../" + program.config );
	_.each( params, function( value, key ) {
		program[ key ] = value;
	} );
}