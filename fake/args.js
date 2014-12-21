program = require('commander');

program
	.version( '0.0.1' )
	.parse( process.argv );

if( process.argv.length < 2 ) {
	program.help();
}
