function* f() {
  var x = 0;
  do {
    yield x++;
  } while (yield 'test');
}

var g = f();
assert.deepEqual(g.next(), {value: 0, done: false});
assert.deepEqual(g.next(), {value: 'test', done: false});
assert.deepEqual(g.next(true), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 'test', done: false});
assert.deepEqual(g.next(true), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 'test', done: false});
assert.deepEqual(g.next(false), {value: undefined, done: true});

function* f2() {
  var x = 0;
  do {
    yield x++;
  } while ((yield 'a') || (yield 'b'));
}

var g2 = f2();
assert.deepEqual(g2.next(), {value: 0, done: false});
assert.deepEqual(g2.next(), {value: 'a', done: false});
assert.deepEqual(g2.next(true), {value: 1, done: false});
assert.deepEqual(g2.next(), {value: 'a', done: false});
assert.deepEqual(g2.next(false), {value: 'b', done: false});
assert.deepEqual(g2.next(true), {value: 2, done: false});
assert.deepEqual(g2.next(false), {value: 'a', done: false});
assert.deepEqual(g2.next(false), {value: 'b', done: false});
assert.deepEqual(g2.next(), {value: undefined, done: true});
