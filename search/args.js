var fs = require('fs');
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-o, --collection [name]', 'name of the collection to read from' )
	.option( '-c, --config [type]', 'Config file' )
	.option( '-m, --min [field]', 'Find the minimum value of a set' )
	.option( '-M, --max [field]', 'Find the maximum value of a set ' )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}

if( program.config ) {
	var params = JSON.parse( fs.readFileSync( program.config ) );
	_.each( params, function( value, key ) {
		program[ key ]	= value;
	} );
}
