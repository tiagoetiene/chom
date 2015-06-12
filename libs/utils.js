var fs = require('fs');
var JSONStream 	= require('JSONStream');
var es 				= require('event-stream');
var _ = require("underscore");
var mkdirp = require( "mkdirp" );

process.stdin.setEncoding('utf8');

function getUserHome() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function getCHOMDir() {
	return getUserHome() + '/.chom';
}

function getCredentialsFile() {
	return getCHOMDir() + "/credentials.json";
}

module.exports = {
	get : function( dict, field ) {
		var fields = field.split(".");
		var data = dict;
		for( var i = 0; i < fields.length; ++i ) {
			var val = data[ fields[ i ] ];
			if( _.isUndefined( val ) ) {
				return undefined;
			}
			data = val; 
		}
		return data;
	},
	set : function( dict, field, value ) {
		var fields = field.split(".");
		var data = dict;
		for( var i = 0; i < fields.length - 1; ++i) {
			var f = fields[ i ];
			if( _.has( data, f ) == false ) {
				data[ f ] = {};
			}
			data = data[ f ];
		}
		data[ fields[ fields.length - 1 ] ] = value;
	},
	parserList : function( list ) {
		return list.split(",");
	},
	toJSON : function( string ) {
		return eval("(function(){return " + string + ";})()");
	},
	printToFile : function( filename, keywordDict ) {
		setInterval(function( ) {
			var total = 0;
			var text = "";
			var count = 0;
			_.each( keywordDict, function( value, keyword ) { 
				text += pad( keyword  + ": " + value, 25, " ", STR_PAD_RIGHT );
				total += value;

				count++;
				if( count % 6 == 0 )
					text += "\n";	
			});
			text += "\n"
			text += "Total: " +  total; 
			text += "\n"
			fs.writeFile( filename, text, function( err ) {
				if( err ) {
					console.log( "* Error found while writing file: ", err );
					throw err;
				}
			} );

		} , 10000);
	},
	readJSONFromSTDIN : function( callback ) {
		process
			.stdin
			.pipe( JSONStream.parse() )
			.pipe( es.mapSync( function ( data ) {
				callback.call( this, data );
				// return data (not sure why)
				return data;
			} ) );
	},
	getCHOMDir : function() {
		return getCHOMDir();
	},
	getCredentialsFile : function() {
		return getCredentialsFile();
	},
	getCredential : function() {

		//
		// If there are no credentials file, then there's nothing to do
		//
		var credentialsFile = getCredentialsFile();
		if ( !fs.existsSync( credentialsFile ) ) {
			return {};
		}

		//
		// Read credentials and return one at random. Need to improve this
		//
		var credentialsMap = JSON.parse( fs.readFileSync( credentialsFile ) );
		var keys = _.keys( credentialsMap );
		if( keys.length > 0 ) {
			return credentialsMap[ keys[ _.random( 0, ( keys.length-1 ) ) ] ];
		}
		return {};
	}
}


/**
*
*  Javascript string pad
*  http://www.webtoolkit.info/
*
**/

var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

function pad(str, len, pad, dir) {

    if (typeof(len) == "undefined") { var len = 0; }
    if (typeof(pad) == "undefined") { var pad = ' '; }
    if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }

    if (len + 1 >= str.length) {

        switch (dir){

            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
            break;

            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
            break;

            default:
                str = str + Array(len + 1 - str.length).join(pad);
            break;

        } // switch

    }

    return str;

}