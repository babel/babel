function foo({
     x: {
       y: {
         z: a = b
       } = {},
       w: b = 20
     },
     a: c = 30
}) {
  assert.equal(a, 10);
  assert.equal(b, 20);
  assert.equal(c, 30);
}

foo({ x: {} });
