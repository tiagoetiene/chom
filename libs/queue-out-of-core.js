var fs = require('fs');

var maxObjectPerFile = 100;
var queue = [];

var basefilename = "/tmp/";

var indexBack = 0;
var indexFront = 0;

module.exports = {
	push : function( datum ) {
		queue.push( datum );
		console.assert( queue.length <= maxObjectPerFile );

		// If the next element to be inserted causes the
		// length to be greater than or euqal the 
		// maximum number of objects per file,
		// then create a new file
		if( queue.length == maxObjectPerFile ) {
			
			var filename = basefilename + "chom.queue." + indexFront + ".txt";

			//
			// Save queue to file
			//
			fs.writeFileSync( filename, JSON.stringify( queue ) );
			queue = [];

			indexFront++;
		}		
	},
	pop : function( ) {
		if( indexBack == indexFront ) {
			return queue.splice(0, queue.length);
		}

		var filename = basefilename + "chom.queue." + indexBack + ".txt";
		
		//
		// 1 Read file from disk
		//
		var data = fs.readFileSync( filename );
		if( data == undefined )
			return [ ];

		fs.unlink( filename, function( err ) {  if( err ) throw err; } );
		indexBack++;
		return JSON.parse( data );
	}
}