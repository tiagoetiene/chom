#!/usr/bin/env node

Sentiment 		= require('sentiment');

args			= require('./libs/args');
utils			= require('./libs/utils');


function isNumber( n ) { 
      return !isNaN( parseFloat( n ) ) && isFinite( n ); 
}


function sentiment( text ) {
	var sentiment =  Sentiment( text ).comparative;
	if(sentiment === undefined)
		sentiment = 0;
	return sentiment;
}

utils.readJSONFromSTDIN( function( tweet ) {
	
	var score = sentiment( tweet.text );
	tweet.sentiment = ( isNumber( score ) ) ? score : 0;

	// Saving to database
	process.stdout.write( JSON.stringify( tweet ) + "\n" );
} );