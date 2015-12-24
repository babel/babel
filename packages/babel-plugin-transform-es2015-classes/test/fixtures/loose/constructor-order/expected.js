var x = function () {
  x.prototype.f = function f() {
    1;
    2;
    3;
  };

  function x() {
    babelHelpers.classCallCheck(this, x);

    4;
    5;
    6;
  }

  return x;
}();
