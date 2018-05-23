(function() {

  // ensure non strict mode.
  function f() { return this; }
  expect(f.call(undefined)).not.toBeUndefined();

  var yield = 1;
  expect(yield).toBe(1);

  function g(yield) {
    return yield;
  }
  expect(g(2)).toBe(2);

  var o = {
    yield: yield
  };
  expect(o.yield).toBe(1);

  var o2 = {
    yield
  };
  expect(o.yield).toBe(1);

  function h(yield) {
    return yield * yield;
  }
  expect(h(3)).toBe(9);
})();
