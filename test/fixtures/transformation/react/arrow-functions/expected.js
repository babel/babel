var foo = function () {
  var _this = this;
  return function () {
    return React.createElement(_this, null);
  };
};

var bar = function () {
  var _this = this;
  return function () {
    return React.createElement(_this.foo, null);
  };
};
