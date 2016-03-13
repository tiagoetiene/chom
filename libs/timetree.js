"use strict";
var _ = require( "underscore" );

class TweetHistogram {
	constructor( binSize, valuer ) {
		this.binSize = binSize
		this.valuer = valuer
		this.hist = new Map()
		this.data = new Map()
		this.updt = new Map()
  	}

  	getBin( date ) {
  		return Math.floor( date / this.binSize ) * this.binSize
  	}

  	add( tweet ) {
  		var date = +( new Date( tweet.created_at ) )
  		var bin = this.getBin( date )
  		var val = this.valuer.call( this, tweet )
  		if( this.hist.has( bin ) == false ) {
  			this.hist.set( bin, 0 )
  			this.data.set( bin, 0 )
  		}
  		this.hist.set( bin, this.hist.get( bin ) + 1 )
  		this.data.set( bin, this.data.get( bin ) + val )
  		this.updt.set( bin, true )
  	}

  	updated( date ) {
  		this.updt.set( this.getBin( +date ), false )
  	}

  	values() {
  		var data = []
  		for( let keyPair of this.hist ) {
  			var bin = keyPair[ 0 ]
  			var tweetCount = keyPair[ 1 ]
  		  	data.push( { bin : bin, 
  		  				 count : tweetCount,
  		  				 value : this.data.get( bin ),
  		  				 updated : this.updt.get( bin ) } )
		}
  		return _.sortBy( data, 'bin');
  	}
}

class TimeTree {
	constructor( depth, valuer ) {
		var milliseconds = 1000.0
		this.depth = depth
		this.histograms = new Map()
		for( var i = 0; i < depth; ++i ) {
			var hist = new TweetHistogram( milliseconds, valuer )
			this.histograms.set( i, hist )
			milliseconds *= 4;
		}
	}

	add( tweet ) {
		for( let keyPair of this.histograms ) {
			var depth = keyPair[ 0 ]
			var hist = keyPair[ 1 ]
			hist.add( tweet )
		}
	}

	updated( depth, date ) {
		this.histograms.get( depth ).updated( date )
	}

	values( depth ) {
		return this.histograms.get( depth ).values()
	}
}

module.exports = {
	TimeTree : function( depth, valuer ) {
		return new TimeTree( depth, valuer )
	}
}