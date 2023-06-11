"use strict";

let Hello = /*#__PURE__*/function () {
  function Hello() {
    babelHelpers.classCallCheck(this, Hello);
  }
  babelHelpers.createClass(Hello, [{
    key: "dec",
    value: function dec() {
      return () => "hello";
    }
  }]);
  return Hello;
}();
let Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);
  var _super = babelHelpers.createSuper(Outer);
  function Outer() {
    var _dec, _init_hello;
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = _super.call(this);
    _dec = babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Outer.prototype)), "dec", _thisSuper);
    let Inner = /*#__PURE__*/babelHelpers.createClass(function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, "hello", _init_hello(this));
    });
    [_init_hello] = babelHelpers.applyDecs2305(Inner, [[_dec, 0, "hello"]], []).e;
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
