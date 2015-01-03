var fs = require('fs');
program = require('commander');

function parserList( list ) {
	return list.split(",");
}

program
	.version( '0.0.1' )
	.option( '-k, --keys [list]', "comma separated list of keys to be used during summarization", parserList )
	.option( '-c, --config [type]', 'configuration file that may include one or more command show in this menu' )
	.option( '-m, --max [number]', 'maximum number of objects to be kept in memory', 50000, parseInt )
	.option( '--cast [list]', 'comma separated list of pairs "key,type", where key is converted to type "type" ', parserList )
	.option( '--code [code]', 'code to be run at input json object "datum"' )
	.option( '--collection [name]', 'name of the collection to be saved to' )
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