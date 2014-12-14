
Args		= require('./args.js');

T = {};
_.each(Args.databases().lang, function(datum, lang) {
	T[ lang ] = new Twit( datum );
});

Accounts = [];

function LoadAccounts( callback ) {
	MongoClient.connect(Args.databases().accounts.mongo_url, function(err, db) {

		if(err)  {
			throw err;
		}

		// Getting a collection handler
		var accountsCollection = db.collection(Args.databases().accounts.collection);

		// Retrieving all documents form the collection and storing it at Accounts
		accountsCollection.find( { }, function(err, cursor) {
			if(err) {
				throw err;
			}
			cursor.each( function(err, doc) {
				if(err) 
					throw err;

				if(doc !== null) {
					doc.counter = 0;
					Accounts.push( doc );	
				}
				else
					callback.call(this)
			});
		});
	});	
}


module.exports = {
	loadAccounts  : function( callback ) {
		LoadAccounts( callback );
	},
	getStreams : function( selected_lang ) {
		if(selected_lang === undefined)
			return Accounts;
		var candidates = [];
		_.each(Accounts, function(candidate) {
			var found = false;
			_.each(candidate.languages, function(lang) {
				if(lang === selected_lang)
					found = true;
			});
			if(found === true)
				candidates.push(candidate);
		});
		return candidates;
	}
}