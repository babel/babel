// Options: --block-binding

let result = []; 
for (let i = 1; i < 3; i ++) {
  for (let j = 9; j > 7; j --) {
    result.push(
      function() { return i + ':' + j; }
    );
  }
}

// ----------------------------------------------------------------------------

assert.equal('1:9', result[0]());
assert.equal('1:8', result[1]());
assert.equal('2:9', result[2]());
assert.equal('2:8', result[3]());
assert.equal(4, result.length);
