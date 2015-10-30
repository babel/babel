(function() {

  // ensure non strict mode.
  function f() { return this; }
  assert(f.call(undefined) !== undefined);

  var yield = 1;
  assert.equal(yield, 1);

  function g(yield) {
    return yield;
  }
  assert.equal(g(2), 2);

  var o = {
    yield: yield
  };
  assert.equal(o.yield, 1);

  var o2 = {
    yield
  };
  assert.equal(o.yield, 1);

  function h(yield) {
    return yield * yield;
  }
  assert.equal(h(3), 9);
})();
