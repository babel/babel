var calls = 0;
function g() {
  return ++calls;
}

function fn(o, a = o[g()] **= 2) {
  return a;
}

var o = { 1: 3, 2: 5 };
expect(fn(o)).toBe(9);
expect(calls).toBe(1);
expect(o).toEqual({ 1: 9, 2: 5 });

// The default value is not evaluated when an argument is passed.
expect(fn(o, 0)).toBe(0);
expect(calls).toBe(1);
