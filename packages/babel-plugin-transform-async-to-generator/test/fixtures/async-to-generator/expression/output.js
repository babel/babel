var _ref, _ref2, _ref3;
var foo = function foo() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  })).apply(this, arguments);
};
var foo2 = function foo2() {
    return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* () {
      var wat = yield bar();
    })).apply(this, arguments);
  },
  bar = function bar() {
    return (_ref3 = _ref3 || babelHelpers.asyncToGenerator(function* () {
      var wat = yield foo();
    })).apply(this, arguments);
  };
