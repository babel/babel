var Base =
/*#__PURE__*/
function () {
  "use strict";

  function Base() {}

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
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Sub.prototype;

  // Redefining method here
  _proto.test = function test() {
    return 1;
  };

  babelHelpers.inheritsLoose(Sub, _Base);
  return Sub;
}(Base);

expect(new Sub().test()).toBe(1);
