function f(o) {
  for (const x of [1]) switch (x) {
    case 1:
      ({ a: o.x = 1 } = {});
      ({ b: o.y = 2 } = { b: 3 });
  }
  return o;
}
expect(f({})).toEqual({ x: 1, y: 3 });
