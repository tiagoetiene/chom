utils = require('../libs/utils')
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-c, --create-object', 'creates a json object using the input fields' )
	.option( '-f, --fields [field]', "field which values will be extracted", utils.parserList, [] )
	.option( '-d, --delimiter [dem]', "delimiter between extracted value" )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}
