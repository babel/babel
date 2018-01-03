function foo() {
  var _this = this;

  arr.map((0,
  /*#__PURE__*/
  function (x) {
    babelHelpers.newArrowCheck(this, _this);
    return x * x;
  }.bind(this)));
  var f = (0,
  /*#__PURE__*/
  function f(x, y) {
    babelHelpers.newArrowCheck(this, _this);
    return x * y;
  }.bind(this));

  (function () {
    var _this2 = this;

    return 0,
    /*#__PURE__*/
    function () {
      babelHelpers.newArrowCheck(this, _this2);
      return this;
    }.bind(this);
  })();

  return {
    g: (0,
    /*#__PURE__*/
    function g() {
      babelHelpers.newArrowCheck(this, _this);
      return this;
    }.bind(this))
  };
}
