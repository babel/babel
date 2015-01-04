// Options: --block-binding

let result = [];
let obj = {a : 'hello a', b : 'hello b', c : 'hello c' };
for (let x in obj) {
  result.push(
    function() { return obj[x]; }
  );
}

// ----------------------------------------------------------------------------

assert.equal('hello a', result[0]());
assert.equal('hello b', result[1]());
assert.equal('hello c', result[2]());
