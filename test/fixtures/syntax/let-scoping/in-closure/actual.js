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

var result = letInClosure(10);
assert.deepEqual(1, result[0]());
assert.deepEqual(2, result[1]());
assert.deepEqual(4, result[2]());
assert.deepEqual(5, result[3]());
assert.deepEqual(7, result[4]());
assert.deepEqual(8, result[5]());
