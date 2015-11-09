// f is declared at the end to test hoisting.

var g = f();
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});

function* f() {
  yield 1;
}

function* f() {
  yield 2;
}