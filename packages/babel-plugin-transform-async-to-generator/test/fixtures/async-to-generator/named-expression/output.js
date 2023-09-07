var _bar;
var foo = function bar() {
  return (_bar = _bar || babelHelpers.asyncToGenerator(function* () {
    console.log(bar);
  })).apply(this, arguments);
};
