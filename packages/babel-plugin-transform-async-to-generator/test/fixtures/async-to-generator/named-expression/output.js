function _bar() {
  _bar = babelHelpers.asyncToGenerator(function* bar() {
    console.log(bar);
  });
  return _bar.apply(this, arguments);
}

var foo = function bar() {
  return _bar.apply(this, arguments);
};
