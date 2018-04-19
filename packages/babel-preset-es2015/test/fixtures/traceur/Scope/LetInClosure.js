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
expect(result[0]()).toBe(1);
expect(result[1]()).toBe(2);
expect(result[2]()).toBe(4);
expect(result[3]()).toBe(5);
expect(result[4]()).toBe(7);
expect(result[5]()).toBe(8);
