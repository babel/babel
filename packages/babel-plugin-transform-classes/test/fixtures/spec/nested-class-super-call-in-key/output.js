"use strict";

var Hello = function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return {
    toString() {
      return 'hello';
    }

  };
};

var Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);

  var _super = babelHelpers.createSuper(Outer);

  function Outer() {
    var _this;

    babelHelpers.classCallCheck(this, Outer);

    var Inner = /*#__PURE__*/function (_this2) {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
      }

      babelHelpers.createClass(Inner, [{
        key: _this2,
        value: function value() {
          return 'hello';
        }
      }]);
      return Inner;
    }(_this = _super.call(this));

    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }

  return Outer;
}(Hello);

expect(new Outer().hello()).toBe('hello');
