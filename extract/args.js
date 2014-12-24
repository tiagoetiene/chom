program = require('commander');

program
	.version( '0.0.1' )
	.option( '-f, --field [field]', "field which values will be extracted" )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}
