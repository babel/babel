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
expect(g0.next()).toEqual({value: 0, done: false});
expect(g0.next()).toEqual({value: 1, done: false});
expect(g0.next()).toEqual({value: 2, done: false});

var g1 = f1();
expect(g1.next()).toEqual({value: 0, done: false});
expect(g1.next()).toEqual({value: 1, done: false});
expect(g1.next()).toEqual({value: 2, done: false});

var g2 = f2();
expect(g2.next()).toEqual({value: 0, done: false});
expect(g2.next()).toEqual({value: 1, done: false});
expect(g2.next()).toEqual({value: 2, done: false});

var g3 = f3();
expect(g3.next()).toEqual({value: 0, done: false});
expect(g3.next()).toEqual({value: 1, done: false});
expect(g3.next()).toEqual({value: 2, done: false});

var g4 = f4();
expect(g4.next()).toEqual({value: 0, done: false});
expect(g4.next()).toEqual({value: 1, done: false});
expect(g4.next()).toEqual({value: 2, done: false});

var g5 = f5();
expect(g5.next()).toEqual({value: 0, done: false});
expect(g5.next()).toEqual({value: 1, done: false});
expect(g5.next()).toEqual({value: 2, done: false});

var g6 = f6();
expect(g6.next()).toEqual({value: 0, done: false});
expect(g6.next()).toEqual({value: 1, done: false});
expect(g6.next()).toEqual({value: 2, done: false});

var g7 = f7();
expect(g7.next()).toEqual({value: 0, done: false});
expect(g7.next()).toEqual({value: 1, done: false});
expect(g7.next()).toEqual({value: 2, done: false});
