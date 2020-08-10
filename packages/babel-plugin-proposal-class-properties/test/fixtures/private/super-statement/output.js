var _bar = new WeakMap();

var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  var _super = babelHelpers.createSuper(Foo);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = _super.call(this);

    _bar.set(babelHelpers.assertThisInitialized(_this), {
      writable: true,
      value: "foo"
    });

    return _this;
  }

  return Foo;
}(Bar);
