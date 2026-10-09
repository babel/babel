function f(x, y) {
  return (effects.push(0), 'a') +
    (do { if (effects.push(1), x) return 'x'; 'b' }) +
    (do { if (effects.push(2), y) return 'y'; 'c' }) +
    (effects.push(3), 'd');
}

effects = [];
expect(f(0, 0)).toBe('abcd');
expect(effects).toEqual([0, 1, 2, 3]);

effects = [];
expect(f(1, 0)).toBe('x');
expect(effects).toEqual([0, 1]);

effects = [];
expect(f(0, 1)).toBe('y');
expect(effects).toEqual([0, 1, 2]);
