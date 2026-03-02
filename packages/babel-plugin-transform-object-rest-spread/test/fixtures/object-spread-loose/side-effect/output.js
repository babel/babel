var k = {
  a: 1,
  b: 2
};
var o = babelHelpers.extends({
  a: 3
}, k, {
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
var output = babelHelpers.extends({}, pureA, {
  get foo() {},
  get bar() {}
}, pureB, pureC, impureFunc(), pureD, {
  pureD
});
var simpleOutput = babelHelpers.extends({}, pureA, {
  test: '1'
}, pureB);
