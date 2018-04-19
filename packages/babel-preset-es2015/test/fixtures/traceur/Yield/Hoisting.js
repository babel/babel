// f is declared at the end to test hoisting.

var g = f();
expect(g.next()).toEqual({value: 2, done: false});
expect(g.next()).toEqual({value: undefined, done: true});

function* f() {
  yield 1;
}

function* f() {
  yield 2;
}
