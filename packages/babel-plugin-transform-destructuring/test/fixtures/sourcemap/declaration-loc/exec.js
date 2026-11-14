const fn = (arg) => {
  var [x, y] = arg;
  return [x, y];
}

expect(fn([1, 2, 3])).toEqual([1, 2]);
expect(fn("ab")).toEqual(["a", "b"]);
expect(() => fn(null)).toThrow(TypeError);
