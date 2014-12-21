program = require('commander');

program
	.version( '0.0.1' )
	.option( '-c, --config [type]', 'Config file' )
	.option( '-m, --min', 'Find the minimum value of a set' )
	.option( '-M, --max', 'Find the maximum value of a set ' )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}

if( program.config ) {
	program = require( "../" + program.config );
}
