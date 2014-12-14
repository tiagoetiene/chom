#!/usr/bin/env node

_ 				= require("underscore");
MongoClient	= require("mongodb").MongoClient;
Twit 			= require("twit");
Readable 		= require('stream').Readable;
emitter			= require('events').EventEmitter;
moment		= require('moment');

args			= require("./libs/args");
out				= require("./libs/out");
utils			= require('./libs/utils');

var inputCertificate = params.certificate;
var inputKeywords = params.keywords;
var inputGroup = params.group;
var inputLang = ( params.lang ) ? params.lang : "en";
var inputStream = ( params.stream ) ? true : false;
var inputSearch = ( params.search ) ? params.search : false;
var inputUntilDate = ( typeof inputSearch != "boolean" ) ? inputSearch : "";
var inputDatabase = params.database;

var totalNumberOfTweets = { tweets : 0 };

//
// Establishing connection with twitter
// 
if( inputSearch || inputStream ) {
	console.assert( inputCertificate != undefined );
	var T;
	if( inputGroup == undefined ) {
		T = new Twit( inputCertificate[ 0 ] );
	} else {
		T = new Twit( inputCertificate[ inputGroup ] );
	}	
}


//
// Pre-processing keywords
//
inputKeywords = _.filter( inputKeywords, function( keyword, idx ) {
	return idx % inputCertificate.length == 0;
});
_.each( inputKeywords, function( keyword, idx ) {
	inputKeywords[ idx ] = keyword.toLowerCase();
});

process.stdout.setMaxListeners( 0 );

function printTweet( tweet ) {
	var message = tweet.text.toLowerCase();
	_.each( inputKeywords, function( keyword ) {
		if( message.indexOf( keyword ) != -1 ) {
			tweet.keyword = keyword;
			tweet.created_at = new Date( tweet.created_at );
			process.stdout.write( JSON.stringify( tweet ) + "\n" );
			totalNumberOfTweets.tweets++;
		}
	} );
}


if( inputStream ) {

	//
	// Starting stream of tweets
	//
	var stream = T.stream( "statuses/filter", { track: inputKeywords, language: inputLang });
	stream.on( "tweet", printTweet );

} else if( inputSearch ) {

	//
	//  Search for all tweets 
	//
	var q = "";
	_.each( inputKeywords, function( keyword, idx ) {
		q += keyword;
		q += ( idx < ( inputKeywords.length - 1) ) ?  " OR " : "";
	});
	
	var first = true;
	var maxid = "";
	var stop = false;
	var running = false;
	var handle = setInterval( function() {
		if( stop ) {
			clearInterval( handle );
		} else {
			// In case nothing is running, let's do something
			if( running == false ) {

				// Ok, running has started
				running = true;

				// Building query string
				var options = { q : q, count : 100};
				if( _.isEmpty( maxid ) == false ) {
					options.max_id =  maxid;	
				}
				if( _.isEmpty( inputUntilDate ) == false && first == true ) {
					var date = moment( new Date( inputUntilDate ) );
					options.until = date.format( "YYYY-MM-DD");
					first = false;
				}

				T.get( 'search/tweets', options, function( err, data, response ) {
					if( err ) {
						console.log( "* Error found while searching tweets: ", err );
						throw err;
					}

					if( data != undefined ) {
						var tweets = data.statuses;
						_.each( tweets, function( tweet ) { if( tweet.id ) printTweet( tweet ); });

						if( data.search_metadata ) {
							var next = data.search_metadata.next_results;
							if( next ) {
								var matches = next.match( /\?\max\_id=(.+?)\&/ );
								if( matches.length == 2 ) {
									// Retrieving next page
									maxid = matches[ 1 ];
								}
							}
						}
					}
					running = false;
				});
			}
		}
	}, 2100 );
} else if( inputDatabase ) {

	//
	// Reads data from database, instead of the internet
	//
	MongoClient.connect( inputDatabase.mongo_url, function(err, db) {
	
		if(err)  {
			console.log('* Error found while connecting to the database:', err);
			throw err;
		}

		var collection = db.collection( inputDatabase.collection );
		var stream = collection.find( {} ).stream();

		stream.on( "close", function() {
			db.close( );
		});
		stream.on( "error", function( err ) {
			console.log( err );
		});
		stream.on( "data", function( tweet ) {
			if( err ) {
				console.log('* Error found while searching collection:', err);
				throw err;
			}
			printTweet( tweet );
		} );	
	} );
}

utils.printToFile( "/tmp/chom.fetch.txt", totalNumberOfTweets );