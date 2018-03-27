function destructObject() {
  var a, b, c, d;
  (((((((((((({a, x: b, y: {c, z: [,d]}} = {
    a: 7,  // field with shorthand a => a: a syntax
    x: 8,  // typical syntax
    y: {   // nested object destructuring
           // missing binding 'c'
      z: [10, 11, 12]  // nested array destructuring
    }
  }))))))))))));
  return {
    a: a,
    b: b,
    c: c,
    d: d
  };
}

// ----------------------------------------------------------------------------

var result = destructObject();
expect(result.a).toBe(7);
expect(result.b).toBe(8);
expect(result.c).toBeUndefined();
expect(result.d).toBe(11);

var {0: x, '1': y, length: z} = [0, 1, 2, 3];
expect(x).toBe(0);
expect(y).toBe(1);
expect(z).toBe(4);

var {x: y,} = {x: 5};
expect(y).toBe(5);

var x;
(((((((((((({x = 6} = {}))))))))))));
expect(x).toBe(6);

var z;
(((((((((((({x: {y = 7}, z = 8} = {x: {}}))))))))))));
expect(y).toBe(7);
expect(z).toBe(8);
