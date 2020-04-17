var _this = this;

// These are actually handled by transform-arrow-functions
const _x = function x() {
  babelHelpers.newArrowCheck(this, _this);
  return _x;
}.bind(this);

const y = function y(x) {
  babelHelpers.newArrowCheck(this, _this);
  return x();
}.bind(this);

const z = {
  z: function z() {
    babelHelpers.newArrowCheck(this, _this);
    return y(_x);
  }.bind(this)
}.z;
