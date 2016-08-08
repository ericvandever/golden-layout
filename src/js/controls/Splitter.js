lm.controls.Splitter = function( isVertical, size ) {
	this._isVertical = isVertical;
	this._size = size;

	this.element = this._createElement();
	this._dragListener = new lm.utils.DragListener( this.element );
	// TODO is there a way to call off for the associated methods instead of tracking internally?
	this._events = new Map();
};

lm.utils.copy( lm.controls.Splitter.prototype, {
	on: function( event, callback, context ) {
		this._events.set(event, callback);
		this._dragListener.on( event, callback, context );
	},

	off: function( event, callback ) {
		this._dragListener.off( event, callback );
	},

	_$destroy: function() {
		var dragListener = this._dragListener;
		if( dragListener ) {
			this._events.forEach(function(callback, event)  {
				dragListener.off(event, callback);
			});
			this._events.clear();
			this._dragListener.destroy();
			this._dragListener = null;
		}
		this.element.remove();
		this.element = null;
	},

	_createElement: function() {
		var element = $( '<div class="lm_splitter"><div class="lm_drag_handle"></div></div>' );
		element.addClass( 'lm_' + ( this._isVertical ? 'vertical' : 'horizontal' ) );
		element[ this._isVertical ? 'height' : 'width' ]( this._size );

		return element;
	}
});
