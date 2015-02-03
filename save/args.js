var utils = require('fs');
var fs = require('fs');
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-k, --keys [list]', "comma separated list of keys to be used during summarization", utils.parserList )
	.option( '-c, --config [type]', 'configuration file that may include one or more command show in this menu' )
	.option( '-m, --max [number]', 'maximum number of objects to be kept in memory', 1000, parseInt )
	.option( '-a, --cast [list]', 'comma separated list of pairs "key,type", where key is converted to type "type". type is one of: date, objectid ', parserList )
	.option( '-o, --code [code]', 'code to be run at input json object "datum"' )
	.option( '-s, --save-interval [milliseconds]', 'timeinterval used to save bulk data', 1000, parseInt )
	.option( '-i, --simulate', 'do not save to database, only simulate', false )
	.option( '-l, --collection [name]', 'name of the collection to be saved to' )
	.option( '-n, --insert', 'insert date instead of trying to update it', false )
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