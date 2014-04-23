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
    this._diameter = 25;
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

  var shift = function() {
    var that = this;
    var shift = calcShift( this._direction, this._speed );

    this._timeoutID = setTimeout( function() {
      that.move.call( that );
    }, 10 );

    this.$node.css( 'left', '+=' + shift[0] );
    this.$node.css( 'top', '+=' + shift[1] );
  };

  Mover.prototype.move = function() {
    // calculate new angle from collisions before movement (shift)
    this.collide( window.dancers );
    shift.call( this );
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
    if ( ( thatPosition[0] <= 0 &&
           that._direction >= Math.PI / 2 &&
           that._direction <= Math.PI * 3 / 2 ) ||
         ( thatPosition[0] >= $( 'body' ).width() - 25 &&
           ( that._direction <= Math.PI / 2 ||
             that._direction >= Math.PI * 3 / 2 )
         )
       ) {
      that._direction = that._direction + Math.PI;
      if ( that._direction > 2 * Math.PI ) {
        that._direction = that._direction - 2 * Math.PI;
      }
    }
    if ( ( thatPosition[1] <= 0 &&
           that._direction >= Math.PI ) ||
         ( thatPosition[1] >= $( 'body' ).height() - 25 &&
           that._direction <= Math.PI
         )
       ) {
      that._direction = that._direction + Math.PI;
      if ( that._direction > 2 * Math.PI ) {
        that._direction = that._direction - 2 * Math.PI;
      }
    }

    _.each( dancers, function( dancer ) {
      if ( dancer === that ) {
        return;
      }

      if ( calcDistance( that, dancer ) <= that._diameter ) {
        if ( dot.call( that, dancer ) > 0 ) {
          reflect.call( that, dancer );
        }


      }
    });
  };

  var dot = function( dancer ) {
    var vectorDiff = [];
    var radialDiff;

    vectorDiff.push( +dancer.$node.css( 'left' ).slice( 0, -2 ) -
                     +this.$node.css( 'left' ).slice( 0, -2 ) );
    vectorDiff.push( +dancer.$node.css( 'top' ).slice( 0, -2 ) -
                     +this.$node.css( 'top' ).slice( 0, -2 ) );
    radialDiff = Math.atan( vectorDiff[1], vectorDiff[0] );

    return Math.cos( this._direction - radialDiff );
  };

  var reflect = function( dancer ) {
    var a = this._direction;
    var b = dancer._direction;
    var lineOfSymmetry = a + ( ( a - b ) / 2 );

    a = lineOfSymmetry + Math.PI / 2;
    b = lineOfSymmetry - Math.PI / 2;

    // ensure they are between 0 and 2 * PI
    if ( a >= 2 * Math.PI ) {
      a -= 2 * Math.PI;
    } else if ( a < 0 ) {
      a += 2 * Math.PI;
    }

    if ( b >= 2 * Math.PI ) {
      b -= 2 * Math.PI;
    } else if ( b < 0 ) {
      b += 2 * Math.PI;
    }

    this._direction = a;
    dancer._direction = b;
  };

  this.Mover = Mover;
}() );
