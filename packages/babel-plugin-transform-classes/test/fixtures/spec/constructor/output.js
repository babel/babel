var Test = /*#__PURE__*/babelHelpers.createClass(function Test() {
  "use strict";

  babelHelpers.classCallCheck(this, Test);
  this.state = "test";
});
var Foo = /*#__PURE__*/function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);
  var _super = babelHelpers.createSuper(Foo);
  function Foo() {
    var _this;
    babelHelpers.classCallCheck(this, Foo);
    _this = _super.call(this);
    _this.state = "test";
    return _this;
  }
  return babelHelpers.createClass(Foo);
}(Bar);
var ConstructorScoping = /*#__PURE__*/babelHelpers.createClass(function ConstructorScoping() {
  "use strict";

  babelHelpers.classCallCheck(this, ConstructorScoping);
  var bar;
  {
    var _bar;
  }
});
