"use strict";

var Hello =
/*#__PURE__*/
function () {
  function Hello() {
    babelHelpers.classCallCheck(this, Hello);
  }

  babelHelpers.createClass(Hello, [{
    key: "toString",
    value: function toString() {
      return 'hello';
    }
  }]);
  return Hello;
}();

var Outer =
/*#__PURE__*/
function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);

  function Outer() {
    var _this;

    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Outer).call(this));
    var Inner = {
      [babelHelpers.get(babelHelpers.getPrototypeOf(Outer.prototype), "toString", babelHelpers.assertThisInitialized(_this)).call(babelHelpers.assertThisInitialized(_this))]() {
        return 'hello';
      }

    };
    return babelHelpers.possibleConstructorReturn(_this, Inner);
  }

  return Outer;
}(Hello);

expect(new Outer().hello()).toBe('hello');
