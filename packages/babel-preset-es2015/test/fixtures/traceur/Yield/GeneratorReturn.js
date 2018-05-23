function assertClosed(g) {
  expect(g.next()).toEqual({value: undefined, done: true});
}

//-----------------------------------------------------------------------------

var g;

function* G1() {
  return 42;
}

function* G2() {
  return;
}

function* G3() {
  return undefined;
}

function* G4() {
  return 42;
  yield 1000;
}

function* G5() {
  yield 1000;
  return 42;
}

function* G6() {
  try {
    yield 1000;
    return 42;
    yield 2000;
  } catch(e) {
    return 43;
  } finally {
    // TODO: Is 'return' allowed inside 'finally'?
    // return 44;
  }
}

//----

function id(G) {
  return G;
}

function wrap(G) {
  return function*() {
    var r = yield* G();
    return r;
  };
}

//----

var tests = [
  [G1, [], 42],
  [G2, [], undefined],
  [G3, [], undefined],
  [G4, [], 42],
  [G5, [1000], 42],
  [G6, [1000], 42]
];

//-----------------------------------------------------------------------------

[id, wrap].forEach((W) => {

  tests.forEach(([G, y, r]) => {
    var g = W(G)();
    y.forEach(x => expect(g.next()).toEqual({value: x, done: false}));

    expect(g.next()).toEqual({value: r, done: true});
    assertClosed(g);
  });

  //----

  g = W(G6)();
  expect(g.next()).toEqual({value: 1000, done: false});
  expect(g.throw()).toEqual({value: 43, done: true});

});
