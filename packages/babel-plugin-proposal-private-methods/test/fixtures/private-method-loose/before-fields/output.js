var Cl =
/*#__PURE__*/
function () {
  "use strict";

  function Cl() {
    babelHelpers.classCallCheck(this, Cl);
    Object.defineProperty(this, _method, {
      value: _method2
    });
    this.prop = babelHelpers.classPrivateFieldLooseBase(this, _method)[_method](1);
    Object.defineProperty(this, _priv, {
      writable: true,
      value: babelHelpers.classPrivateFieldLooseBase(this, _method)[_method](2)
    });
  }

  babelHelpers.createClass(Cl, [{
    key: "getPriv",
    value: function getPriv() {
      return babelHelpers.classPrivateFieldLooseBase(this, _priv)[_priv];
    }
  }]);
  return Cl;
}();

var _priv = babelHelpers.classPrivateFieldLooseKey("priv");

var _method = babelHelpers.classPrivateFieldLooseKey("method");

var _method2 = function _method2(x) {
  return x;
};
