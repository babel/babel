var x = 0;

function* f() {
  x++;
}

var g = f();
expect(x).toBe(0);
expect(g.next()).toEqual({done: true, value: undefined});
expect(x).toBe(1);
