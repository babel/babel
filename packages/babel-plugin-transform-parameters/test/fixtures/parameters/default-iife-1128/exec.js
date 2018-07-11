const bar = true;

function foo(a = bar, ...b) {
  const bar = false;
  expect(b[0]).toBe(2);
  expect(b[1]).toBe(3);
}

foo(1, 2, 3);
