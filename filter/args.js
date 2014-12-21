program = require('commander');

function parserList( list ) {
	return list.split(",");
}

program
	.version( '0.0.1' )
	.option( '-p --predicate [pred]', 'boolean evaluated function deciding whether a tweet should be discarde (false) or not (true) ', "return true;" )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}
