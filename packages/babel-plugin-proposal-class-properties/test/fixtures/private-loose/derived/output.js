var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _prop, {
    writable: true,
    value: "foo"
  });
};

var _prop = babelHelpers.classPrivateFieldLooseKey("prop");

var Bar =
/*#__PURE__*/
function (_Foo) {
  "use strict";

  function Bar(...args) {
    var _temp, _this;

    babelHelpers.classCallCheck(this, Bar);
    return babelHelpers.possibleConstructorReturn(_this, (_temp = _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Bar).call(this, ...args)), Object.defineProperty(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)), _prop2, {
      writable: true,
      value: "bar"
    }), _temp));
  }

  babelHelpers.inherits(Bar, _Foo);
  return Bar;
}(Foo);

var _prop2 = babelHelpers.classPrivateFieldLooseKey("prop");
