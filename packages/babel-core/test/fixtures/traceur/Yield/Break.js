var x = ':';

function* f() {
  label1: {
    x += 'a';
    yield 1;
    x += 'b'
    while (true && true) {
      break label1;
    }
    x += 'c';
  }
  x += 'd'
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assert.equal(x, ':abd');


x = ':';

function* f2() {
  label1: {
    x += 'a';
    while(true) {
      x += 'b';
      label2: {
        x += 'c';
        yield 3;
        x += 'd';
        while (true) {
          break label1;
        }
        x += 'e';
      }
      x += 'f';
    }
    x += 'g';
  }
  x += 'h';
}

g = f2();
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assert.equal(x, ':abcdh');
