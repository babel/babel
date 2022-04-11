function foo({
     x: {
       y: {
         z: a = b
       } = {},
       w: b = 20
     },
     a: c = 30
}) {
  expect(a).toBe(10);
  expect(b).toBe(20);
  expect(c).toBe(10);
}

foo({ x: {} });
