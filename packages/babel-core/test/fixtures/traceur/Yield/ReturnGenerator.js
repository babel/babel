function* f1() {
  yield 1;
  yield 2;
}

var g1 = f1();
assert.deepEqual(g1.next(), {value: 1, done: false});
assert.deepEqual(g1.return(42), {value: 42, done: true});
assert.deepEqual(g1.next(), {value: undefined, done: true});

function* f2() {
  yield 1;
  try {
    yield 2;
  } catch (e) {
    return 3;
  }
}

var g2 = f2();
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.return(42), {value: 42, done: true});
assert.deepEqual(g2.next(), {value: undefined, done: true});

function* f3() {
  try {
    yield 1;
  } finally {
    yield 2;
  }
}

var g3 = f3();
assert.deepEqual(g3.next(), {value: 1, done: false});
assert.deepEqual(g3.return(42), {value: 2, done: false});
assert.deepEqual(g3.next(), {value: 42, done: true});
assert.deepEqual(g3.next(), {value: undefined, done: true});

function* f4() {
  var x = 9;
  function *g() {
    try {
      yield 1;
      yield 2;
    } finally {
      x = 10;
    }
  }
  try {
    yield* g();
  } finally {
    yield x;
  }
}

var g4 = f4();
assert.deepEqual(g4.next(), {value: 1, done: false});
assert.deepEqual(g4.return(42), {value: 10, done: false});
assert.deepEqual(g4.next(), {value: 42, done: true});
assert.deepEqual(g4.next(), {value: undefined, done: true});

function* f5() {
  try {
    yield 1;
  } finally {
    return 2;
  }
}

var g5 = f5();
assert.deepEqual(g5.next(), {value: 1, done: false});
assert.deepEqual(g5.return(42), {value: 2, done: true});
assert.deepEqual(g5.next(), {value: undefined, done: true});

function* f6() {
  yield 1;
}

var g6 = f6();
assert.deepEqual(g6.return(42), {value: 42, done: true});
assert.deepEqual(g6.next(), {value: undefined, done: true});

function* f7() {
  return 1;
}

var g7 = f7();
assert.deepEqual(g7.next(), {value: 1, done: true});
assert.deepEqual(g7.next(), {value: undefined, done: true});
assert.deepEqual(g7.return(42), {value: 42, done: true});
assert.deepEqual(g7.next(), {value: undefined, done: true});

function* f8() {
  function* g() {
    try {
      yield 1;
      yield 2;
    } finally {
      return 10;
    }
  }
  yield* g();
}

var g8 = f8();
assert.deepEqual(g8.next(), {value: 1, done: false});
assert.deepEqual(g8.return(42), {value: 10, done: true});
assert.deepEqual(g8.next(), {value: undefined, done: true});

function* f9() {
  function* g() {
    try {
      yield 1;
      yield 2;
    } finally {
      yield 3;
    }
  }
  yield* g();
}

var g9 = f9();
assert.deepEqual(g9.next(), {value: 1, done: false});
assert.deepEqual(g9.return(142), {value: 3, done: false});
assert.deepEqual(g9.next(), {value: undefined, done: true});

function* f10() {
  try {
    try {
      yield 1;
    }
    finally {
      try {
        throw 2;
      } catch (e) {
      }
    }
    return 3;
  } finally {
    return 4;  
  }
}

var g10 = f10();
assert.deepEqual(g10.next(), {value: 1, done: false});
assert.deepEqual(g10.return(42), {value: 4, done: true});
assert.deepEqual(g10.next(), {value: undefined, done: true});

function* f11() {
  function* g() {
    try {
      yield 1;
      yield 2;
    } finally {
      yield 3333;
      f11.x = 10;
      yield 4;
    }
  }
  yield* g();
  yield 5;
}

var g11 = f11();
assert.deepEqual(g11.next(), {value: 1, done: false});
assert.deepEqual(g11.return(42), {value: 3333, done: false});
assert.deepEqual(g11.next(), {value: 4, done: false});
assert.deepEqual(g11.next(), {value: 5, done: false});
assert.deepEqual(g11.next(), {value: undefined, done: true});
assert.equal(f11.x, 10);


function* f12() {
  try {
    return 'apple';
  } finally {
    yield 'orange';
  }
}
var g12 = f12();
assert.deepEqual(g12.next(), {value: 'orange', done: false});
assert.deepEqual(g12.next(), {value: 'apple', done: true});

function* f13() {
  function* f() {
    try {
      yield 'pear';
    } finally {
      yield 'strawberry';
    }
  }
  try {
    return 'cherry';
  } finally {
    f13.x = yield* f();
    yield 'banana';
  }
}
var g13 = f13();
assert.deepEqual(g13.next(), {value: 'pear', done: false});
assert.deepEqual(g13.return('peach'), {value: 'strawberry', done: false});
assert.deepEqual(g13.next(), {value: 'banana', done: false});
assert.deepEqual(g13.next(), {value: 'cherry', done: true});
assert.equal(f13.x, 'peach');

function* f14() {
  function* g() {
    try {
      yield 11;
      yield 22;
    } finally {
      yield 33;
      f14.x = 44;
      yield 55;
    }
  }
  return yield* g();
}

var g14 = f14();
assert.deepEqual(g14.next(), {value: 11, done: false});
assert.deepEqual(g14.return(43), {value: 33, done: false});
assert.deepEqual(g14.next(), {value: 55, done: false});
assert.equal(f14.x, 44);
assert.deepEqual(g14.next(), {value: 43, done: true});
assert.deepEqual(g14.next(), {value: undefined, done: true});

