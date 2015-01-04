// Options: --symbols

var s = Symbol();

var object = {
  [s]: 42
};

assert.equal(object[s], 42);
