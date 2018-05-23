var Test = function Test() {
  "use strict";

  babelHelpers.classCallCheck(this, Test);
  this.state = "test";
};

var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
    _this.state = "test";
    return _this;
  }

  babelHelpers.inherits(Foo, _Bar);
  return Foo;
}(Bar);

var ConstructorScoping = function ConstructorScoping() {
  "use strict";

  babelHelpers.classCallCheck(this, ConstructorScoping);
  var bar;
  {
    var _bar;
  }
};
