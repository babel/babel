var _;

var inc = x => x + 1;

assert.equal((_ = 10, inc(_)), 11);
