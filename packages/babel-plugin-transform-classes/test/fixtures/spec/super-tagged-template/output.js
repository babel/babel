var Derived = /*#__PURE__*/function (_Base) {
  "use strict";

  function Derived() {
    babelHelpers.classCallCheck(this, Derived);
    return babelHelpers.callSuper(this, Derived, arguments);
  }
  babelHelpers.inherits(Derived, _Base);
  return babelHelpers.createClass(Derived, [{
    key: "method",
    value: function method() {
      return babelHelpers.superPropGet(Derived, "tag", this, 1).bind(this)`a`;
    }
  }], [{
    key: "method",
    value: function method() {
      return babelHelpers.superPropGet(Derived, key, this).bind(this)`b`;
    }
  }]);
}(Base);
