// Options: --block-binding

let result = [];
for (let a = 1; a < 3; a++) {
  result.push(
    function() { return 'for ' + a; }
  );
}

// ----------------------------------------------------------------------------

assert.equal('for 1', result[0]());
assert.equal('for 2', result[1]());
assert.equal(2, result.length);
