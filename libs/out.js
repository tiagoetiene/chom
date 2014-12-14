var callback = undefined;

module.exports = {
	callback  : function( _callback ) {
		callback = _callback;
	},
	print : function( data ) {
		if( callback != undefined )
			callback.call( this, data );
	}
}