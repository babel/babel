var Root = /*#__PURE__*/babelHelpers.createClass(function Root() {
  "use strict";

  babelHelpers.classCallCheck(this, Root);
});
var Foo = /*#__PURE__*/function (_Root) {
  "use strict";

  var _Foo;
  (function () {
    var _this;
    _Foo = function Foo(cb = (_this = _super.call(this), babelHelpers.assertThisInitialized(_this))) {
      babelHelpers.classCallCheck(this, _Foo);
      _this.cb = cb;
      return _this;
    };
  })();
  babelHelpers.inherits(_Foo, _Root);
  var _super = babelHelpers.createSuper(_Foo);
  return babelHelpers.createClass(_Foo);
}(Root);
expect(new Foo().cb.constructor.name).toBe("Foo");
