program = require('commander');

function parserList( list ) {
	return list.split(",");
}

program
	.version( '0.0.1' )
	.option( '-f --field [value]', 'field to be used during summarization' )
	.option( '-d --depth [value]', 'max tree depth', 9 )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}
