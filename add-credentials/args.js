utils = require('../libs/utils')
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-a, --consumer-key [key]', 'Consumer key' )
	.option( '-b, --consumer-secret [key]', 'Consumer secret' )
	.option( '-c, --token-key [key]', 'Token key' )
	.option( '-d, --token-secret [key]', 'Token secret' )
	.option( '-n, --name [name]', 'Key name' )
	.parse( process.argv );

if( process.argv.length < 5 ) {
	program.help();
}
