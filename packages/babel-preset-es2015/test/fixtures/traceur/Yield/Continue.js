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
expect(g.next()).toEqual({value: 1, done: false});
expect(g.next()).toEqual({value: undefined, done: true});
expect(x).toBe(':i:0j:0i:1j:1i:2j:2');
