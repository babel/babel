var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _prop.set(this, "foo");
};

var _prop = new WeakMap();

var Bar =
/*#__PURE__*/
function (_Foo) {
  "use strict";

  function Bar(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Bar);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Bar).call(this, ...args)), _prop2.set(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)), "bar"), _temp));
  }

  babelHelpers.inherits(Bar, _Foo);
  return Bar;
}(Foo);

var _prop2 = new WeakMap();
