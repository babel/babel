// Options: --block-binding

function destructVarDecl() {
  // Const; and an array inside an object literal inside an array.
  const a = 0, [b, {c, x: [d]}] = [1, {c: 2, x: [3]}];

  // Now an object literal inside an array inside an object literal.
  var {x: [{e}, f], g} = {x: [{e:4}, 5], g: 6};

  // Two patterns in one var.
  var {h} = {h: 7}, {i} = {i: 8};

  return { a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i };
}

// ----------------------------------------------------------------------------

var result = destructVarDecl();
assert.equal(0, result.a);
assert.equal(1, result.b);
assert.equal(2, result.c);
assert.equal(3, result.d);
assert.equal(4, result.e);
assert.equal(5, result.f);
assert.equal(6, result.g);
assert.equal(7, result.h);
assert.equal(8, result.i);
