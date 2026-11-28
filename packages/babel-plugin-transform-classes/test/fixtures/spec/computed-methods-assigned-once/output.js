var once,
  twice,
  later,
  init = a();
once = a();
twice = b();
twice = c();
var A = /*#__PURE__*/function (_twice, _later) {
  "use strict";

  function A() {
    babelHelpers.classCallCheck(this, A);
  }
  return babelHelpers.createClass(A, [{
    key: once,
    value: function value() {}
  }, {
    key: _twice,
    value: function value() {}
  }, {
    key: _later,
    value: function value() {}
  }, {
    key: init,
    value: function value() {}
  }]);
}(twice, later);
later = d();
