function destructObject() {
  var a, b, c, d;
  ({a, x: b, y: {c, z: [,d]}} = {
    a: 7,  // field with shorthand a => a: a syntax
    x: 8,  // typical syntax
    y: {   // nested object destructuring
           // missing binding 'c'
      z: [10, 11, 12]  // nested array destructuring
    }
  });
  return {
    a: a,
    b: b,
    c: c,
    d: d
  };
}

// ----------------------------------------------------------------------------

var result = destructObject();
assert.equal(7, result.a);
assert.equal(8, result.b);
assert.isUndefined(result.c);
assert.equal(11, result.d);

var {0: x, '1': y, length: z} = [0, 1, 2, 3];
assert.equal(0, x);
assert.equal(1, y);
assert.equal(4, z);

var {x: y,} = {x: 5};
assert.equal(5, y);

var x;
({x = 6} = {});
assert.equal(x, 6);

var z;
({x: {y = 7}, z = 8} = {x: {}});
assert.equal(y, 7);
assert.equal(z, 8);
