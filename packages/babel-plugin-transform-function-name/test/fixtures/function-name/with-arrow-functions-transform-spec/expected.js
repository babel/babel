var _this = this;

// These are actually handled by transform-arrow-functions
// x's name does not match exactly to avoid shadowing the const x
const x = function _x() {
  babelHelpers.newArrowCheck(this, _this);
  return x;
}.bind(this);

const y = function y(x) {
  babelHelpers.newArrowCheck(this, _this);
  return x();
}.bind(this);

const z = {
  z: function z() {
    babelHelpers.newArrowCheck(this, _this);
    return y(x);
  }.bind(this)
}.z;
