var foo = function foo() {
  var _this = this;

  return function () {
    return React.createElement(_this, null);
  };
};

var bar = function bar() {
  var _this2 = this;

  return function () {
    return React.createElement(_this2.foo, null);
  };
};