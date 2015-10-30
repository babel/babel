// Options: --block-binding

function letInClosure(n) {
  var l = [];
  for (var i = 0; i < n; i ++) {
    let let_i = i;
    if (i % 3 == 0) {
      continue;
    }
    l.push(function() {
      return let_i;
    });
  }
  return l;
}

// ----------------------------------------------------------------------------

var result = letInClosure(10);
assert.equal(1, result[0]());
assert.equal(2, result[1]());
assert.equal(4, result[2]());
assert.equal(5, result[3]());
assert.equal(7, result[4]());
assert.equal(8, result[5]());
