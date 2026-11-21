function* f(a) {
  return [(yield "x") || a, (yield "y") && a, a || (yield "z")];
}

let it = f(0);
expect(it.next()).toEqual({ value: "x", done: false });
expect(it.next(1)).toEqual({ value: "y", done: false });
expect(it.next(2)).toEqual({ value: "z", done: false });
expect(it.next(3)).toEqual({ value: [1, 0, 3], done: true });

it = f(4);
expect(it.next()).toEqual({ value: "x", done: false });
expect(it.next(0)).toEqual({ value: "y", done: false });
expect(it.next(5)).toEqual({ value: [4, 4, 4], done: true });
