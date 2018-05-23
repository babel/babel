function* f() {
  return yield 1;
}

var g = f();

expect(g.next()).toEqual({value: 1, done: false});
expect(g.next(2)).toEqual({value: 2, done: true});
function* f2() {
  return (yield 3) + (yield 4);
}

var g2 = f2();
expect(g2.next()).toEqual({value: 3, done: false});
expect(g2.next(5)).toEqual({value: 4, done: false});
expect(g2.next(6)).toEqual({value: 11, done: true});


function* f3() {
  return (yield 7) || (yield 8);
}

var g3 = f3();
expect(g3.next()).toEqual({value: 7, done: false});
expect(g3.next(9)).toEqual({value: 9, done: true});

g3 = f3();
expect(g3.next()).toEqual({value: 7, done: false});
expect(g3.next(0)).toEqual({value: 8, done: false});
expect(g3.next(10)).toEqual({value: 10, done: true});

function* f4() {
  return (yield 11) && (yield 12);
}

var g4 = f4();
expect(g4.next()).toEqual({value: 11, done: false});
expect(g4.next(0)).toEqual({value: 0, done: true});
g4 = f4();
expect(g4.next()).toEqual({value: 11, done: false});
expect(g4.next(13)).toEqual({value: 12, done: false});
expect(g4.next(14)).toEqual({value: 14, done: true});

function* f5() {
  return (yield 15) ? (yield 16) : (yield 17);
}

var g5 = f5();
expect(g5.next()).toEqual({value: 15, done: false});
expect(g5.next(true)).toEqual({value: 16, done: false});
expect(g5.next(18)).toEqual({value: 18, done: true});
g5 = f5();
expect(g5.next()).toEqual({value: 15, done: false});
expect(g5.next(false)).toEqual({value: 17, done: false});
expect(g5.next(19)).toEqual({value: 19, done: true});
