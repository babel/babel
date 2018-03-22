function foo(
   { x: { y: { z: a = 10 } = {}, w: b = 20 }, a: c = 30 }
) {
  expect(a).toBe(10);;
  expect(b).toBe(20);;
  expect(c).toBe(30);;
}

foo({ x: {} });
