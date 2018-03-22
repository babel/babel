function* f1() {
  yield 1;
  yield 2;
}

var g1 = f1();
expect(g1.next()).toEqual({value: 1, done: false});
expect(g1.return(42)).toEqual({value: 42, done: true});
expect(g1.next()).toEqual({value: undefined, done: true});

function* f2() {
  yield 1;
  try {
    yield 2;
  } catch (e) {
    return 3;
  }
}

var g2 = f2();
expect(g2.next()).toEqual({value: 1, done: false});
expect(g2.return(42)).toEqual({value: 42, done: true});
expect(g2.next()).toEqual({value: undefined, done: true});

function* f3() {
  try {
    yield 1;
  } finally {
    yield 2;
  }
}

var g3 = f3();
expect(g3.next()).toEqual({value: 1, done: false});
expect(g3.return(42)).toEqual({value: 2, done: false});
expect(g3.next()).toEqual({value: 42, done: true});
expect(g3.next()).toEqual({value: undefined, done: true});

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
expect(g4.next()).toEqual({value: 1, done: false});
expect(g4.return(42)).toEqual({value: 10, done: false});
expect(g4.next()).toEqual({value: 42, done: true});
expect(g4.next()).toEqual({value: undefined, done: true});

function* f5() {
  try {
    yield 1;
  } finally {
    return 2;
  }
}

var g5 = f5();
expect(g5.next()).toEqual({value: 1, done: false});
expect(g5.return(42)).toEqual({value: 2, done: true});
expect(g5.next()).toEqual({value: undefined, done: true});

function* f6() {
  yield 1;
}

var g6 = f6();
expect(g6.return(42)).toEqual({value: 42, done: true});
expect(g6.next()).toEqual({value: undefined, done: true});

function* f7() {
  return 1;
}

var g7 = f7();
expect(g7.next()).toEqual({value: 1, done: true});
expect(g7.next()).toEqual({value: undefined, done: true});
expect(g7.return(42)).toEqual({value: 42, done: true});
expect(g7.next()).toEqual({value: undefined, done: true});

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
expect(g8.next()).toEqual({value: 1, done: false});
expect(g8.return(42)).toEqual({value: 10, done: true});
expect(g8.next()).toEqual({value: undefined, done: true});

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
expect(g9.next()).toEqual({value: 1, done: false});
expect(g9.return(142)).toEqual({value: 3, done: false});
expect(g9.next()).toEqual({value: undefined, done: true});

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
expect(g10.next()).toEqual({value: 1, done: false});
expect(g10.return(42)).toEqual({value: 4, done: true});
expect(g10.next()).toEqual({value: undefined, done: true});

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
expect(g11.next()).toEqual({value: 1, done: false});
expect(g11.return(42)).toEqual({value: 3333, done: false});
expect(g11.next()).toEqual({value: 4, done: false});
expect(g11.next()).toEqual({value: 5, done: false});
expect(g11.next()).toEqual({value: undefined, done: true});
expect(f11.x).toBe(10);


function* f12() {
  try {
    return 'apple';
  } finally {
    yield 'orange';
  }
}
var g12 = f12();
expect(g12.next()).toEqual({value: 'orange', done: false});
expect(g12.next()).toEqual({value: 'apple', done: true});

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
expect(g13.next()).toEqual({value: 'pear', done: false});
expect(g13.return('peach')).toEqual({value: 'strawberry', done: false});
expect(g13.next()).toEqual({value: 'banana', done: false});
expect(g13.next()).toEqual({value: 'cherry', done: true});
expect(f13.x).toBe('peach');

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
expect(g14.next()).toEqual({value: 11, done: false});
expect(g14.return(43)).toEqual({value: 33, done: false});
expect(g14.next()).toEqual({value: 55, done: false});
expect(f14.x).toBe(44);
expect(g14.next()).toEqual({value: 43, done: true});
expect(g14.next()).toEqual({value: undefined, done: true});

