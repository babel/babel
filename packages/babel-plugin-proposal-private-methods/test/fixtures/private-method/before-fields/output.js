var Cl =
/*#__PURE__*/
function () {
  "use strict";

  function Cl() {
    babelHelpers.classCallCheck(this, Cl);

    _method.add(this);

    babelHelpers.defineProperty(this, "prop", babelHelpers.classPrivateMethodGet(this, _method, _method2).call(this, 1));

    _priv.set(this, {
      writable: true,
      value: babelHelpers.classPrivateMethodGet(this, _method, _method2).call(this, 2)
    });
  }

  babelHelpers.createClass(Cl, [{
    key: "getPriv",
    value: function getPriv() {
      return babelHelpers.classPrivateFieldGet(this, _priv);
    }
  }]);
  return Cl;
}();

var _priv = new WeakMap();

var _method = new WeakSet();

var _method2 = function _method2(x) {
  return x;
};
