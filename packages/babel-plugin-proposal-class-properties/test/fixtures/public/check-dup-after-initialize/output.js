// from issue 6872
var log = [];

var Foo =
/*#__PURE__*/
function (_ref) {
  "use strict";

  babelHelpers.inherits(Foo, _ref);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "x", log.push(1));
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "x", log.push(1));
    return _this;
  }

  return Foo;
}(
/*#__PURE__*/
function () {
  "use strict";

  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }

  return _class;
}());
