#!/usr/bin/env node

_ 				= require("underscore");
MongoClient	= require('mongodb').MongoClient;
args			= require("./libs/args");

var inputDatabase = params.database;
var inputMin = params.min;
var inputMax = params.max;

MongoClient.connect( inputDatabase.mongo_url, function(err, db) {
	
	if(err)  {
		console.log('* Error found while connecting to the database:', err);
		throw err;
	}

	var collection = db.collection( inputDatabase.collection );
	var fields = { _id : false,  };
	var options = { limit : 1 };
	var field = undefined;

	if( inputMin ) {
		field = inputMin;
		options[ "sort" ] = [ [ field, "asc" ] ];
	} else if( inputMax ) {
		field = inputMax;
		options[ "sort" ] = [ [ field, "desc" ] ];
	}

	if( field ) {
		fields[ field ] = true;

		collection.find( {}, fields, options ).toArray( function( err, docs ) {
			if( err ) {
				console.log('* Error found while searching collection:', err);
				throw err;
			}
			process.stdout.write( docs[ 0 ][ field ] + "\n" );
			db.close();
		} );	
	}
});