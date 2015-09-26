var utils = require('../../libs/utils')
var fs = require('fs');
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-l, --limit [number]', 'it limits the number of results)', parseInt ) 
	.option( '-m, --mongo [index]', 'index that represents the database (use \'chom database credentials list\' to obtain it)' )
	.option( '-c, --collection [name]', 'name of the collection to read from' )
	.option( '-C, --close', 'close database on exit', false )
	.parse( process.argv );

if( process.argv.length <= 3 ) {
	program.help();
}
