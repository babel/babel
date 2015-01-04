var x = ':';

function* f() {
  yield 1;
  var j = 0;
  label1: for (var i = 0; i < 3; i++) {
    x += 'i:' + i;
    x += 'j:' + j;
    if (j++ > 4) return;
    continue label1;
    x += 'x';
  }
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assert.equal(x, ':i:0j:0i:1j:1i:2j:2');
