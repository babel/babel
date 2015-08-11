function* f() {
}

var g = f();
assert.deepEqual(g.next(), {done: true, value: undefined});
