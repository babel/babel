function* f() {
  var x = 0;
  for (yield 'init'; x < 3; x++) {
    yield x;
  }
}

var g = f();
assert.deepEqual(g.next(), {value: 'init', done: false});
assert.deepEqual(g.next(), {value: 0, done: false});
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});

function* f2() {
  for (var x = 0; yield 'test'; x++) {
    yield x;
  }
}

var g2 = f2();
assert.deepEqual(g2.next(), {value: 'test', done: false});
assert.deepEqual(g2.next(true), {value: 0, done: false});
assert.deepEqual(g2.next(), {value: 'test', done: false});
assert.deepEqual(g2.next(true), {value: 1, done: false});
assert.deepEqual(g2.next(), {value: 'test', done: false});
assert.deepEqual(g2.next(true), {value: 2, done: false});
assert.deepEqual(g2.next(), {value: 'test', done: false});
assert.deepEqual(g2.next(false), {value: undefined, done: true});

function* f3() {
  for (var x = 0; x < 5; x = yield 'inc') {
    yield x;
  }
}

var g3 = f3();
assert.deepEqual(g3.next(), {value: 0, done: false});
assert.deepEqual(g3.next(), {value: 'inc', done: false});
assert.deepEqual(g3.next(2), {value: 2, done: false});
assert.deepEqual(g3.next(), {value: 'inc', done: false});
assert.deepEqual(g3.next(4), {value: 4, done: false});
assert.deepEqual(g3.next(), {value: 'inc', done: false});
assert.deepEqual(g3.next(1), {value: 1, done: false});
assert.deepEqual(g3.next(), {value: 'inc', done: false});
assert.deepEqual(g3.next(5), {value: undefined, done: true});
