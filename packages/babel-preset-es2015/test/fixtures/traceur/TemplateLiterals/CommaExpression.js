expect(`${ (1, 2) }${ (3, 4) }`).toBe('24');
expect(`${ (5, 6) }`).toBe('6');

function templateLiteralCommaTest(callsite, x, y) {
  expect(x).toBe(2);
  expect(y).toBe(4);
  return x + y;
}

expect(templateLiteralCommaTest`${ (1, 2) }${ (3, 4) }`).toBe(6);
