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
      return _Base.prototype.tag.bind(this)`a`;
    }
  }], [{
    key: "method",
    value: function method() {
      return _Base[key].bind(this)`b`;
    }
  }]);
}(Base);
