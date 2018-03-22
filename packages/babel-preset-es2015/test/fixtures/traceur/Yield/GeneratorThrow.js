function assertThrownEquals(x, func) {
  var actualError;
  try {
    func();
  } catch (err) {
    actualError = err;
  }
  expect(x).toBe(actualError);
}

function assertClosed(g) {
  expect(g.next()).toEqual({value: undefined, done: true});
}

//-----------------------------------------------------------------------------

function id(G) {
  return G;
}

function wrap(G) {
  return function* () {
    yield* G();
  };
}

[id, wrap].forEach((W) => { // wrap_forEach

//-----------------------------------------------------------------------------
//
// http://wiki.ecmascript.org/doku.php?id=harmony:generators
//
// G.[[Throw]]
//
//     Let State = G.[[State]]
//     If State = “executing” Throw Error
//     If State = “closed” Throw Error
//     Let X be the first argument
//     If State = “newborn”
//         G.[[State]] := “closed”
//         G.[[Code]] := null
//         Return (throw, X, null)
//     G.[[State]] := “executing”
//     Let Result = Resume(G.[[ExecutionContext]], throw, X)
//     Return Result

var g;

//-----------------------------------------------------------------------------
//
//     If State = “executing” Throw Error

function* G1() {
  yield g.throw();
}
g = W(G1)();
expect(() => g.next()).toThrow('Generator is already running');

//-----------------------------------------------------------------------------
//
//     If State = “closed” Throw Error

function* G2() {
  try {
    yield 1;
    yield 2;
  } catch(e) {
    yield '(' + e + ')';
  }
  yield 3;
}

// - calling throw() on a closed generator should throw an Error.
// - calling throw() on an ended generator should throw an Error.
//   (this is the same as closed, really)

var closeMethods = [
  (g) => {
    expect(g.next()).toEqual({value: 1, done: false});
    expect(g.throw(22)).toEqual({value: '(22)', done: false});
    expect(g.next()).toEqual({value: 3, done: false});
    assertThrownEquals(42, () => g.throw(42));
  },
  (g) => {
    expect(g.next()).toEqual({value: 1, done: false});
    expect(g.next()).toEqual({value: 2, done: false});
    expect(g.next()).toEqual({value: 3, done: false});
    expect(g.next()).toEqual({value: undefined, done: true});
  }
];

closeMethods.forEach((closeMethod) => {
  g = W(G2)();
  closeMethod(g);
  for (var i = 0; i < 8; i++) {
    assertThrownEquals(44, () => g.throw(44));
  }
});

//-----------------------------------------------------------------------------
//
//     Let X be the first argument
//     If State = “newborn”
//         G.[[State]] := “closed”
//         G.[[Code]] := null
//         Return (throw, X, null)

g = W(G2)();

// calling throw(x) on a newborn generator should close the generator, and
// throw x back to the caller.
assertThrownEquals(44, () => g.throw(44));
assertClosed(g);

//-----------------------------------------------------------------------------
//
//     G.[[State]] := “executing”
//     Let Result = Resume(G.[[ExecutionContext]], throw, X)
//     Return Result

g = W(G2)();

// calling throw(x) on a started generator should be the same as hot-replacing
// the last 'yield' with a 'throw x' and calling next() on that generator. So
// it could either throw an exception, or return a value, depending on the
// flow of control.
expect(g.next()).toEqual({value: 1, done: false});
expect(g.throw(22)).toEqual({value: '(22)', done: false});
expect(g.next()).toEqual({value: 3, done: false});

assertThrownEquals(44, () => g.throw(44));
assertClosed(g);

//----

function* G3() {
  try{
    yield 1;
    yield 2;
    yield 3;
  } catch(e) {}
}

g = W(G3)();

// Note: this behavior differs from ionmonkey, which throws 'undefined', and
// not StopIteration, but the StopIteration behavior better matches what I'd
// expect, given the description from the previous test.
expect(g.next()).toEqual({value: 1, done: false});
expect(g.throw(44)).toEqual({value: undefined, done: true});
assertClosed(g);

}); // end wrap_forEach
