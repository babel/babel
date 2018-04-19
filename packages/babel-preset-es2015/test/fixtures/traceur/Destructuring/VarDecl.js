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
expect(result.a).toBe(0);
expect(result.b).toBe(1);
expect(result.c).toBe(2);
expect(result.d).toBe(3);
expect(result.e).toBe(4);
expect(result.f).toBe(5);
expect(result.g).toBe(6);
expect(result.h).toBe(7);
expect(result.i).toBe(8);
