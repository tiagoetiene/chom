_ = require("underscore");
program = require('commander');

program
	.version( '0.0.1' )
	.option( '-c, --config [type]', 'configuration file that may include one or more command show in this menu' )
	.option( '-d --deleted', 'retrieving only deleted tweets' )
	.option( '-p --predicate [pred]', 'boolean evaluated function deciding whether a tweet should be discarde (false) or not (true) ', "return true;" )
	.parse( process.argv );

if( process.argv.length <= 2 ) {
	program.help();
}

if( program.config ) {
	var params = require( "../" + program.config );
	_.each( params, function( value, key ) {
		program[ key ] = value;
	} );
}
