var _this = this;
let f = function f() {
  let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  babelHelpers.newArrowCheck(this, _this);
  return x + 1;
}.bind(this);
