function* f0() {
  var x = 0;
  for (;;) {
    yield x++;
  }
}

function* f1() {
  var x = 0;
  for (; ; 1) {
    yield x++;
  }
}

function* f2() {
  var x = 0;
  for (; 1; ) {
    yield x++;
  }
}

function* f3() {
  var x = 0;
  for (; 1; 1) {
    yield x++;
  }
}

function* f4() {
  var x = 0;
  for (1; ; ) {
    yield x++;
  }
}

function* f5() {
  var x = 0;
  for (1; ; 1) {
    yield x++;
  }
}

function* f6() {
  var x = 0;
  for (1; 1; ) {
    yield x++;
  }
}

function* f7() {
  var x = 0;
  for (1; 1; 1) {
    yield x++;
  }
}

var g0 = f0();
assert.deepEqual(g0.next(), {value: 0, done: false});
assert.deepEqual(g0.next(), {value: 1, done: false});
assert.deepEqual(g0.next(), {value: 2, done: false});

var g1 = f1();
assert.deepEqual(g1.next(), {value: 0, done: false});
assert.deepEqual(g1.next(), {value: 1, done: false});
assert.deepEqual(g1.next(), {value: 2, done: false});

var g2 = f2();
assert.deepEqual(g2.next(), {value: 0, done: false});
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.next(), {value: 2, done: false});

var g3 = f3();
assert.deepEqual(g3.next(), {value: 0, done: false});
assert.deepEqual(g3.next(), {value: 1, done: false});
assert.deepEqual(g3.next(), {value: 2, done: false});

var g4 = f4();
assert.deepEqual(g4.next(), {value: 0, done: false});
assert.deepEqual(g4.next(), {value: 1, done: false});
assert.deepEqual(g4.next(), {value: 2, done: false});

var g5 = f5();
assert.deepEqual(g5.next(), {value: 0, done: false});
assert.deepEqual(g5.next(), {value: 1, done: false});
assert.deepEqual(g5.next(), {value: 2, done: false});

var g6 = f6();
assert.deepEqual(g6.next(), {value: 0, done: false});
assert.deepEqual(g6.next(), {value: 1, done: false});
assert.deepEqual(g6.next(), {value: 2, done: false});

var g7 = f7();
assert.deepEqual(g7.next(), {value: 0, done: false});
assert.deepEqual(g7.next(), {value: 1, done: false});
assert.deepEqual(g7.next(), {value: 2, done: false});
