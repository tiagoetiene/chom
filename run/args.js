program = require('commander');

program
	.version( '0.0.1' )
	.option( '-c, --code [field]', 'execute custom code to each json object "datum" ', "return;" )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}