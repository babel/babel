var a;
var b;
var c;
var d;
var x;
var y;
babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2({
  x
}, y), {}, {
  a
}, b), {}, {
  c
});
babelHelpers.objectSpread2({}, Object.prototype);
babelHelpers.objectSpread2({}, {
  foo: 'bar'
});
babelHelpers.objectSpread2(babelHelpers.objectSpread2({}, {
  foo: 'bar'
}), {
  bar: 'baz'
});
babelHelpers.objectSpread2({}, {
  get foo() {
    return 'foo';
  }
});
