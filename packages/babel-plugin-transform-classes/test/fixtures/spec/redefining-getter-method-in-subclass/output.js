var Base =
/*#__PURE__*/
function () {
  "use strict";

  function Base() {
    babelHelpers.classCallCheck(this, Base);
  }

  babelHelpers.createClass(Base, [{
    key: "test",
    get: function get() {}
  }]);
  return Base;
}();

var Sub =
/*#__PURE__*/
function (_Base) {
  "use strict";

  function Sub() {
    babelHelpers.classCallCheck(this, Sub);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Sub).apply(this, arguments));
  }

  babelHelpers.createClass(Sub, [{
    key: "test",
    // Redefining method here
    value: function test() {
      return 1;
    }
  }]);
  babelHelpers.inherits(Sub, _Base);
  return Sub;
}(Base);

expect(new Sub().test()).toBe(1);
