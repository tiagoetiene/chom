var fs = require('fs');
program = require('commander');

function parserList( list ) {
	return list.split(",");
}

program
	.version( '0.0.1' )
	.option( '-k, --keys [list]', "comma separated list of keys to be used during summarization", parserList )
	.option( '-c, --config [type]', 'configuration file that may include one or more command show in this menu' )
	.option( '--code [code]', 'code to be run at input json object "datum"' )
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