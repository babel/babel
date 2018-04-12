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
    var _this2 = this;

    var _this;

    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Outer).call(this));

    var Inner =
    /*#__PURE__*/
    function () {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
      }

      babelHelpers.createClass(Inner, [{
        key: babelHelpers.get(babelHelpers.getPrototypeOf(Outer.prototype), "toString", babelHelpers.assertThisInitialized(_this2)).call(_this2),
        value: function value() {
          return 'hello';
        }
      }]);
      return Inner;
    }();

    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }

  return Outer;
}(Hello);

assert.equal(new Outer().hello(), 'hello');
