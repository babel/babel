// The rest parameter is converted while the body is wrapped in an IIFE, which
// is passed the parameters redeclared in the body: its array must be built
// outside, like the other parameters.
function g() {}
function f({ a, ...b }, c = g(), ...args) {
  var args = args.concat(1);
  return args;
}
expect(f({ a: 1 }, 2, 3, 4)).toEqual([3, 4, 1]);

// A closure in a default value sees the parameter, not the variable
// redeclared in the body
function id(x) {
  return x;
}
function h({ ...i }, j = id(() => k), ...k) {
  var k = [];
  return j();
}
expect(h({}, undefined, 5, 6)).toEqual([5, 6]);

// The parameters of a generator are initialized when it is called
function* gen({ ...l }, n = g(), ...m) {
  yield [n, m];
}
expect(gen({}, 1, 7).next().value).toEqual([1, [7]]);
