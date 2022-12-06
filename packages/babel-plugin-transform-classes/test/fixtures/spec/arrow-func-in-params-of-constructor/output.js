var Root = /*#__PURE__*/babelHelpers.createClass(function Root() {
  "use strict";

  babelHelpers.classCallCheck(this, Root);
});
var Foo = /*#__PURE__*/function (_Root) {
  "use strict";

  babelHelpers.inherits(Foo, _Root);
  var _super = babelHelpers.createSuper(Foo);
  function Foo(cb = () => {
    console.log("this is", this);
  }) {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = _super.call(this);
    _this.cb = cb;
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Root);
