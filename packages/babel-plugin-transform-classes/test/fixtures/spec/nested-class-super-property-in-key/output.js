"use strict";

var Hello = /*#__PURE__*/function () {
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

var Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);

  var _super = babelHelpers.createSuper(Outer);

  function Outer() {
    var _thisSuper, _this;

    babelHelpers.classCallCheck(this, Outer);
    _this = _super.call(this);

    var Inner = /*#__PURE__*/function (_babelHelpers$get$cal) {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
      }

      babelHelpers.createClass(Inner, [{
        key: _babelHelpers$get$cal,
        value: function value() {
          return 'hello';
        }
      }]);
      return Inner;
    }(babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Outer.prototype)), "toString", _thisSuper).call(_thisSuper));

    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }

  return Outer;
}(Hello);

expect(new Outer().hello()).toBe('hello');
