var a;
var b;
var c;
var d;
var x;
var y;
babelHelpers.extends(babelHelpers.extends(babelHelpers.extends({
  x
}, y), {}, {
  a
}, b), {}, {
  c
});
babelHelpers.extends({}, Object.prototype);
babelHelpers.extends({}, {
  foo: 'bar'
});
babelHelpers.extends(babelHelpers.extends({}, {
  foo: 'bar'
}), {
  bar: 'baz'
});
babelHelpers.extends({}, {
  get foo() {
    return 'foo';
  }
});
