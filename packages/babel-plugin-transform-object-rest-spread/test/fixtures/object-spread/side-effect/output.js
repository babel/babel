var k = {
  a: 1,
  b: 2
};
var o = babelHelpers.objectSpread2(babelHelpers.objectSpread2({
  a: 3
}, k), {}, {
  b: k.a++
});
var pureA = {};
var pureB = {};
var pureC = {};
var pureD = {};
var pureE = {};
function impureFunc() {
  console.log('hello');
}
var output = babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.defineAccessor("get", babelHelpers.defineAccessor("get", babelHelpers.objectSpread2({}, pureA), "foo", Object.getOwnPropertyDescriptor({
  get foo() {}
}, "foo").get), "bar", Object.getOwnPropertyDescriptor({
  get bar() {}
}, "bar").get), pureB), pureC), impureFunc()), pureD), {}, {
  pureD
});
var simpleOutput = babelHelpers.objectSpread2(babelHelpers.objectSpread2({}, pureA), {}, {
  test: '1'
}, pureB);
