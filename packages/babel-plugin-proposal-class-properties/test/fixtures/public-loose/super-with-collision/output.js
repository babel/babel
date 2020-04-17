var A = function A(_force) {
  "use strict";

  babelHelpers.classCallCheck(this, A);
  this.force = force;
  this.foo = babelHelpers.get(babelHelpers.getPrototypeOf(A.prototype), "method", this).call(this);
};
