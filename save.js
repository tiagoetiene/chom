#!/usr/bin/env node
_ 				= require("underscore");
MongoClient	= require('mongodb').MongoClient;
args			= require('./libs/args');
out				= require('./libs/out');
utils			= require('./libs/utils');


// Input arguments
var inputDatabase = params.database;

var totalNumberOfTweets = {};

MongoClient.connect( inputDatabase.mongo_url, function(err, db) {
	if(err)  {
		console.log('* Error found while connecting to the database:', err);
		throw err;
	}
	var collection = db.collection( inputDatabase.collection );
	out.callback( function( data ) { 
		collection.save(data, function(err) {
			if(err) {
				console.log('* Error found while inserting data into the database:', err);
				throw err;
			}
		});
	} );
});

utils.readJSONFromSTDIN( function( data ) {
	// Saving to database
	out.print( data );

	// Updating the tweet count
	if( _.has( totalNumberOfTweets, data.keyword ) == true )
		totalNumberOfTweets[ data.keyword ] += 1;
	else
		totalNumberOfTweets[ data.keyword ] = 1;
} );

// Peridiocally outputs the number of tweets saved 
utils.printToFile( "/tmp/chom.save.txt", totalNumberOfTweets );