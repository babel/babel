function* f() {
}

var g = f();
expect(g.next()).toEqual({done: true, value: undefined});
