module.exports = {
	TimeTree : function( ) {
		var Class = require('jsclass/src/core').Class;
		var Comparable = require('jsclass/src/comparable').Comparable;
		var SortedSet = require('jsclass/src/set').SortedSet;
		var Node = new Class( {
			include : Comparable,
			initialize: function( a, b, c, d ) {	
				
				// At least the first parameter has to be non-null
				console.assert( a );

				this.bin = a;
				this.date = b;
				this.counter = 0;
				this.field = 0;
				this.updated = true;
			},
			compareTo : function( other ) {
				if(this.bin < other.bin) return -1;
				if(this.bin > other.bin) return +1;
				return 0;
			},
			equals: function( other ) {
				return (other instanceof this.klass) && this.bin ==  other.bin;
			}
		} );

		var _dateValuer = Number;
		var _valuer = Number;
		var _intervals = [ ];

		var _depth = 18;
		var _tree = [ ];
		var _maxNodeSize = 100;

		function increment( set, obj, value  ) {
			var index = set._indexOf( obj );
			if( index !== -1) {
				set._members[ index ].updated = true;
				set._members[ index ].counter++;
				set._members[ index ].field += value;
			}
		}

		function tree() { 
		}

		tree.updated = function( depth, date, value ) {
			var set = _tree[ depth ];
			var bin = Math.floor( +date / _intervals[ depth ] );
			var tmp = new Node( bin, _intervals[ depth ] * bin );
			var index = set._indexOf( tmp );

			console.assert( index != -1);
			set._members[ index ].updated = value;

			return tree;
		}

		tree.getBin = function( depth, date ) {
			var set = _tree[ depth ];
			var bin = Math.floor( date / _intervals[ depth ] );
			var tmp = new Node( bin, _intervals[ depth ] * bin );
			var index = set._indexOf( tmp );
			return set._members[ index ];
		}

		tree.clear = function() {
			_intervals = [];
			_tree = [];
			return tree;
		}

		tree.build = function( ) {
			if(_tree.length != 0 && _intervals.length != 0)
				return;

			var milliseconds = 1000.0;
			_intervals = [];
			_tree = [];

			for(var i = 0; i < _depth; ++i) {
				_tree[ i ] = new SortedSet();
				_intervals[ i ] = milliseconds; 
				milliseconds *= 4;
			}
			return tree;
		}

		tree.add = function( _ ) {

			var bin, node, tmp;
			var date = +_dateValuer.call( this, _ );
			var value = _valuer.call( this, _ );

			// Adding new data to the three
			for( var i = 0; i < _depth; ++i ) {
				bin = Math.floor( date / _intervals[ i ] );
				tmp = new Node( bin, _intervals[ i ] * bin );
				
				_tree[ i ].add( tmp )
				node = increment( _tree[ i ], tmp,  value );
			}

			// Removing data if the tree becomes too long
			for( var i = 0; i < _depth; ++i )
				while(_tree[ i ].length > _maxNodeSize) {
					_tree[ i ].remove( new Node( _tree[ i ].first( 1 )[ 0 ].bin ) );
				}

			// Sanity check
			for( var i = 0; i < _depth; ++i ) 
				console.assert( _tree[ i ].length <= _maxNodeSize );

			return tree;
		}

		tree.depth = function( _ ) {
			if( arguments.length == 0 )
				return _depth;
			_depth = _;
			return tree;
		}

		tree.interval = function( _ ) {
			return _intervals[ _ ];
		}

		tree.dateValuer = function( _ ) {
			if( arguments.length == 0 )
				return _;
			_dateValuer = _;
			return tree;
		}

		tree.valuer = function( _ ) {
			if( arguments.length == 0 )
				return _;
			_valuer = _;
			return tree;
		}

		tree.get = function( _ ) {
			console.assert( arguments.length == 1 );
			return _tree[ _ ].select( function(d) { return true } );
		}

		return tree;
	}
}