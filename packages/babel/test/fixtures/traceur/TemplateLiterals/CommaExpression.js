assert.equal('24', `${ 1, 2 }${ 3, 4 }`);
assert.equal('6', `${ 5, 6 }`);

function templateLiteralCommaTest(callsite, x, y) {
  assert.equal(2, x);
  assert.equal(4, y);
  return x + y;
}

assert.equal(6, templateLiteralCommaTest`${ 1, 2 }${ 3, 4 }`);
