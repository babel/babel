// The parameters following a lowered one are moved into the body, but the
// ones before them stay in the list: a body declaration redeclaring them is a
// separate binding, which their closures don't see.
function f({ ...rest }, read = () => value, value, last = value) {
  var value;
  value = 2;
  return [read(), last];
}
expect(f({}, undefined, 1)).toEqual([1, 1]);

// The moved default sees the parameter, not the hoisted function.
function g({ ...rest }, read = () => value, value, last = value) {
  function value() {}
  return [read(), typeof value, last];
}
expect(g({}, undefined, 1)).toEqual([1, "function", 1]);

// The moved closure captures the parameter, not the body variable.
function h({ ...rest }, value, get = () => value) {
  var value = 2;
  return [get(), value];
}
expect(h({}, 1)).toEqual([1, 2]);

// No moved parameter references it: the body declaration stays in place.
function k({ ...rest }, read = () => value, value, last = 5) {
  var value;
  value = 2;
  return [read(), last];
}
expect(k({}, undefined, 1)).toEqual([1, 5]);
