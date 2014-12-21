program = require('commander');

program
	.version( '0.0.1' )
	.option( '-o --old [tweet_field]', 'Old tweet key' )
	.option( '-n --new [tweet_field]', 'New tweet key' )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}
