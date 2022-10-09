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
var output = babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2(babelHelpers.objectSpread2({}, pureA), {}, {
  get foo() {},
  get bar() {}
}, pureB), pureC), impureFunc()), pureD), {}, {
  pureD
});
var simpleOutput = babelHelpers.objectSpread2(babelHelpers.objectSpread2({}, pureA), {}, {
  test: '1'
}, pureB);
