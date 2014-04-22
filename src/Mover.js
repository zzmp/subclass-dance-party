( function() {
  var Mover = function( top,
                        left,
                        timeBetweenSteps,
                        direction,
                        speed
                      ) {
    Dancer.call( this, top, left, timeBetweenSteps );
    this._speed = speed;
    this._direction = direction;
    this.move();
  };

  Mover.prototype = Object.create( Dancer.prototype );
  Mover.prototype.constructor = Mover;

  var calcShift = function( direction, speed ) {
    var shift = [];
    shift.push( speed * Math.cos( direction ) );
    shift.push( speed * Math.sin( direction ) );
    return shift;
  };

  Mover.prototype.move = function() {
    var that = this;
    var shift = calcShift( this._direction, this._speed );

    setTimeout( function() {
      that.move.call( that );
    }, 17 );

    this.$node.css( 'left', '+=' + shift[0] );
    this.$node.css( 'top', '+=' + shift[1] );
  };

  this.Mover = Mover;
}() );
