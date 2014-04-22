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
    this._timeoutID;
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
    // calculate new angle from collisions before movement (shift)
    this.collide( window.dancers );
    shift.call( this );
  };

  var shift = function() {
    var that = this;
    var shift = calcShift( this._direction, this._speed );

    this._timeoutID = setTimeout( function() {
      that.move.call( that );
    }, 17 );

    this.$node.css( 'left', '+=' + shift[0] );
    this.$node.css( 'top', '+=' + shift[1] );
  };

  var getPosition = function( $node ) {
    var position = [];

    position.push( +$node.css( 'left' ).slice( 0, -2 ) );
    position.push( +$node.css( 'top' ).slice( 0, -2 ) );
    return position;
  };

  var calcDistance = function( one, two ) {
    var lefts = [];
    var tops = [];

    lefts.push( +one.$node.css( 'left' ).slice( 0, -2 ) );
    lefts.push( +two.$node.css( 'left' ).slice( 0, -2 ) );
    tops.push( +one.$node.css( 'top' ).slice( 0, -2 ) );
    tops.push( +two.$node.css( 'top' ).slice( 0, -2 ) );

    return Math.pow(
      Math.pow( lefts[0] - lefts[1], 2 ) +
      Math.pow( tops[0] - tops[1], 2 ),
      0.5 );
  };

  Mover.prototype.collide = function( dancers ) {
    var that = this;
    var thatPosition = getPosition( that.$node );

    //  check for collision with window edges
    if ( thatPosition[0] <= 0 ||
      thatPosition[0] >= $( 'body' ).width() - 50 ) {
      that._direction = Math.PI - that._direction;
      if ( that._direction < 0 ) {
        that._direction = ( 2 * Math.PI ) + that._direction;
      }
    } else if ( thatPosition[1] <= 0 ||
      thatPosition[1] >= $( 'body' ).height() - 50 ) {
      that._direction = ( 2 * Math.PI ) - that._direction;
    }

    _.each( dancers, function( dancer ) {
      if ( dancer === that ) {
        return;
      }

      if ( calcDistance( that, dancer ) <= 100 ) {
        reflect.call( that, dancer );
        clearTimeout( dancer._timeoutID );
        shift.call( dancer );
      }
    });
  };

  var reflect = function( dancer ) {
    this._speed += 5;
    dancer._speed += 5;
  };

  var calcReflectedAngle = function( one, two ) {
    // calculate reflected angle based on given angles (radians)
    var planeOfDeflection = one + ( (one + two) / 2 );
    var angleOfReflection = one - planeOfDeflection;
    angleOfReflection = 2 * Math.PI - angleOfReflection;
    angleOfReflection = planeOfDeflection + angleOfReflection;
    if ( angleOfReflection > 2 * Math.PI ) {
      angleOfReflection = angleOfReflection - 2 * Math.PI;
    }

    return angleOfReflection;
  };

  this.Mover = Mover;
}() );
