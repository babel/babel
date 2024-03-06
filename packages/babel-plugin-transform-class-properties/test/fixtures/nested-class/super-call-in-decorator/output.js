"use strict";

let Hello = /*#__PURE__*/babelHelpers.createClass(function Hello() {
  babelHelpers.classCallCheck(this, Hello);
  return () => () => "hello";
});
let Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);
  function Outer() {
    let _ref;
    var _helloDecs, _init_hello, _init_extra_hello, _Inner;
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    _ref = (_helloDecs = _this = babelHelpers.callSuper(this, Outer), "hello");
    let Inner = /*#__PURE__*/babelHelpers.createClass(function Inner() {
      babelHelpers.classCallCheck(this, Inner);
      babelHelpers.defineProperty(this, _ref, _init_hello(this));
      _init_extra_hello(this);
    });
    _Inner = Inner;
    [_init_hello, _init_extra_hello] = babelHelpers.applyDecs2311(_Inner, [], [[_helloDecs, 0, "hello"]]).e;
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
