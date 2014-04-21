( function() {
  var BlinkyDancer = function( top, left, timeBetweenSteps ) {
    Dancer.call(this, top, left, timeBetweenSteps);
  };

  BlinkyDancer.prototype = Object.create(Dancer.prototype);
  BlinkyDancer.prototype.constructor = BlinkyDancer;

  var superStep = BlinkyDancer.step;

  BlinkyDancer.prototype.step  = function() {
    superStep.call(this);
    this.$node.toggle();
  };

  this.BlinkyDancer = BlinkyDancer;
}() );
