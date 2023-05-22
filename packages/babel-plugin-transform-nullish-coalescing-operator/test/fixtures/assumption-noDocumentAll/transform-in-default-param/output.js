function foo(foo, qux = (() => {
  var _foo$bar;
  return (_foo$bar = foo.bar) != null ? _foo$bar : "qux";
})()) {}
function bar(bar, qux = bar != null ? bar : "qux") {}
