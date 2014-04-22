( function() {
  var Shaker = function( top,
                         left,
                         timeBetweenSteps,
                         direction,
                         speed,
                         timeBetweenRotation
                       ) {
    Mover.apply( this, arguments );
    this._timeBetweenRotation = timeBetweenRotation;
  };

  Shaker.prototype = Object.create( Mover.prototype );
  Shaker.prototype.constructor = Shaker;

  var superStep = Shaker.prototype.step;

  Shaker.prototype.step = function() {
    superStep.call( this );
    this._direction = Math.random() * 2 * Math.PI;
  };

  this.Shaker = Shaker;
}() );
