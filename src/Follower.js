( function() {
  var Follower = function (top,
                          left,
                          timeBetweenSteps,
                          speed
                        ) {
    var that = this;

    Mover.call( this, top, left, timeBetweenSteps, 0, speed );
    this.$node.addClass('follower');
  };

  Follower.prototype = Object.create(Mover.prototype);
  Follower.prototype.constructor = Follower;

  Follower.prototype.trackMouse = function( e ) {
    var mouseCoords = [ e.pageX, e.pageY ];
    var nodeCoords = [ +this.$node.css( 'left' ).slice( 0, -2 ),
                       +this.$node.css( 'top' ).slice( 0, -2 )
                     ];

    var vector = [ mouseCoords[0] - nodeCoords[0],
                   mouseCoords[1] - nodeCoords[1]
                 ];

    var direction = Math.atan2( vector[1], vector[0] );
    if ( direction < 0 ) {
      direction += 2 * Math.PI;
    }

    this._direction = direction;
  };

  this.Follower = Follower;
}() );
