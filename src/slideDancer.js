( function() {
  var slideDancer = function( top, left, timeBetweenSteps ) {
    Dancer.call(this, top, left, timeBetweenSteps);
  };

  slideDancer.prototype = Object.create(Dancer.prototype);
  slideDancer.prototype.constructor = slideDancer;

  var superStep = slideDancer.step;

  slideDancer.prototype.step = function() {
    superStep.call(this);
    this.$node.slideDown();
    this.$node.slideUp();
  };

  this.slideDancer = slideDancer;
}() );
