var _this = this;

// These are actually handled by transform-arrow-functions
const _x = (0,
/*#__PURE__*/
function x() {
  babelHelpers.newArrowCheck(this, _this);
  return _x;
}.bind(this));

const y = (0,
/*#__PURE__*/
function y(x) {
  babelHelpers.newArrowCheck(this, _this);
  return x();
}.bind(this));
const z = {
  z: (0,
  /*#__PURE__*/
  function z() {
    babelHelpers.newArrowCheck(this, _this);
    return y(_x);
  }.bind(this))
}.z;
