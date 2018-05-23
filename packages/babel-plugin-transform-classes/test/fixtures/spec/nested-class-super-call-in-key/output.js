"use strict";

var Hello = function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return {
    toString() {
      return 'hello';
    }

  };
};

var Outer =
/*#__PURE__*/
function (_Hello) {
  function Outer() {
    var _this2 = this;

    var _this;

    babelHelpers.classCallCheck(this, Outer);

    var Inner =
    /*#__PURE__*/
    function () {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
      }

      babelHelpers.createClass(Inner, [{
        key: _this = babelHelpers.possibleConstructorReturn(_this2, babelHelpers.getPrototypeOf(Outer).call(_this2)),
        value: function value() {
          return 'hello';
        }
      }]);
      return Inner;
    }();

    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }

  babelHelpers.inherits(Outer, _Hello);
  return Outer;
}(Hello);

expect(new Outer().hello()).toBe('hello');
