var utils = require('../../libs/utils')
var fs = require('fs');
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-k, --keywords [list]', 'comma separated list of keywords', utils.parserList, [] )
	.option( '-l, --lang [language]', 'language to be used (only works for twitter requests)', 'en' )
	.parse( process.argv );

if( process.argv.length <= 3 ) {
	program.help();
}
