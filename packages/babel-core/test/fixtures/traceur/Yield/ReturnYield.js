function* f() {
  return yield 1;
}

var g = f();

assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(2), {value: 2, done: true});
function* f2() {
  return (yield 3) + (yield 4);
}

var g2 = f2();
assert.deepEqual(g2.next(), {value: 3, done: false});
assert.deepEqual(g2.next(5), {value: 4, done: false});
assert.deepEqual(g2.next(6), {value: 11, done: true});


function* f3() {
  return (yield 7) || (yield 8);
}

var g3 = f3();
assert.deepEqual(g3.next(), {value: 7, done: false});
assert.deepEqual(g3.next(9), {value: 9, done: true});

g3 = f3();
assert.deepEqual(g3.next(), {value: 7, done: false});
assert.deepEqual(g3.next(0), {value: 8, done: false});
assert.deepEqual(g3.next(10), {value: 10, done: true});

function* f4() {
  return (yield 11) && (yield 12);
}

var g4 = f4();
assert.deepEqual(g4.next(), {value: 11, done: false});
assert.deepEqual(g4.next(0), {value: 0, done: true});
g4 = f4();
assert.deepEqual(g4.next(), {value: 11, done: false});
assert.deepEqual(g4.next(13), {value: 12, done: false});
assert.deepEqual(g4.next(14), {value: 14, done: true});

function* f5() {
  return (yield 15) ? (yield 16) : (yield 17);
}

var g5 = f5();
assert.deepEqual(g5.next(), {value: 15, done: false});
assert.deepEqual(g5.next(true), {value: 16, done: false});
assert.deepEqual(g5.next(18), {value: 18, done: true});
g5 = f5();
assert.deepEqual(g5.next(), {value: 15, done: false});
assert.deepEqual(g5.next(false), {value: 17, done: false});
assert.deepEqual(g5.next(19), {value: 19, done: true});
