( function() {

  var pickPhoto = function( $node ) {
    var number = Math.floor( Math.random() * 4 );

    if ( number === 0 ) {
      $node.css( 'background-image', "url('img/fredzirdung.jpg')" );
    } else if ( number === 1 ) {
      $node.css( 'background-image', "url('img/marcusphillips.jpg')" );
    } else if ( number === 2 ) {
      $node.css( 'background-image', "url('img/PhillipAlexander.jpg')" );
    } else {
      $node.css( 'background-image', "url('img/shawndrost.jpg')" );
    }
  };

  var Dancer = function( top, left, timeBetweenSteps ) {
    this.$node = $( '<span class="dancer"></span>' );
    this._timeBetweenSteps = timeBetweenSteps;
    this.step();
    this.setPosition( top, left );
    pickPhoto( this.$node );
  };

  Dancer.prototype.step = function() {
    var that = this;

    setTimeout( function() {
      that.step.call( that );
    }, this._timeBetweenSteps );
  };

  Dancer.prototype.setPosition = function( top, left ) {
    var styleSettings = {
      top: top,
      left: left
    };

    this.$node.css( styleSettings );
  };

  Dancer.prototype.lineUp = function() {
    this.$node.css( 'left', 'calc( 50% )' );
  };

this.Dancer = Dancer;
}() );
