function f(x) {
  const obj = {
    [effects.push(1)]: effects.push(2),
    [effects.push(3)]: do { if (effects.push(4), x) return 'x' },
    [effects.push(5)]: effects.push(6),
  };
  return Object.keys(obj).length;
}

effects = [];
expect(f(0)).toBe(3);
expect(effects).toEqual([1, 2, 3, 4, 5, 6]);

effects = [];
expect(f(1)).toBe('x');
expect(effects).toEqual([1, 2, 3, 4]);
