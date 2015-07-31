var utils = require('../../libs/utils')
var fs = require('fs');
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-m, --mongo_url [name]', 'database address' )
	.option( '-c, --collection [name]', 'name of the collection to read from' )
	.option( '-C, --close', 'close database on exit', false )
	.parse( process.argv );

if( process.argv.length <= 3 ) {
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
