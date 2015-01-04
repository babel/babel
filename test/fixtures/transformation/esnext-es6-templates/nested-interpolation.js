assert.strictEqual(
  `a${1}b${`${1+1}c`}3`,
  'a1b2c3'
);
