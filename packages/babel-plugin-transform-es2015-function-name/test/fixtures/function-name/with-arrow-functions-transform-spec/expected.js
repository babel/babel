var _this = this;

// I don't know if this is a bug with arrow-functions spec: true
// or with function-name, but the functions are missing their names.
const x = function () {
  babelHelpers.newArrowCheck(this, _this);
  return x;
}.bind(this);
const y = function (x) {
  babelHelpers.newArrowCheck(this, _this);
  return x();
}.bind(this);
const z = { z: function z() {
    babelHelpers.newArrowCheck(this, _this);
    return y(x);
  }.bind(this) }.z;