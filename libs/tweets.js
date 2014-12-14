_ 				= require("underscore");
MongoClient	= require('mongodb').MongoClient;
Stream 		 	= require('./stream');
Args			= require('./args.js');
Utils			= require('./utils.js');

var tweetCallback = {};

printf = function(d) {
	process.stdout.write(d);
};

function loadTweetsStream(lang) {
	printf('======= Loading Tweet Stream in ' + lang);

	var data = Stream.getStreams( Utils.lang( lang ) );
	var keywords = [];
	var stream;

	_.each(data, function( _ ) { 
		keywords = keywords.concat( _.keywords );
	});
	_.each(data, function(_, idx) { 
		for(var i = 0; i < data[idx].keywords.length; ++i)
			data[idx].keywords[i] = data[idx].keywords[i].toUpperCase();
	});

	stream = T[ lang ].stream('statuses/filter', { track: keywords, language: Utils.lang( lang ) });
	stream.on('tweet', function ( _tweet ) {
		var message = _tweet.text.toUpperCase();
		_.each(data, function( datum , idx) {
			if(Utils.contains(message, datum.keywords)) {
				if( _.has(tweetCallback, datum.name ) )
				{
					_tweet.name = datum.name;
					tweetCallback[datum.name].call(this, _tweet);
				}
			}
		});
	});

	printf( ' ... done!\n' );
}

module.exports = {
	loadStream : function( callback ) {
		_.each( Args.databases().lang, function( datum, lang ) {
			loadTweetsStream( lang );
		});
		callback.call( this );
	},
	setTweetCallback : function( name, callback ) {
		tweetCallback[ name ] = callback;
	}
}