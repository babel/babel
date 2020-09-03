function foo(foo, qux = (() => {
  var _foo$bar;

  return (_foo$bar = foo.bar) !== null && _foo$bar !== void 0 ? _foo$bar : "qux";
})()) {}
