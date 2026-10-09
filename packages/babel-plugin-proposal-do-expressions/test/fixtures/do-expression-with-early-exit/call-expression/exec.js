function f1(a) {
  (do { if (effects.push(1), a) return 0; (arg) => effects.push(arg) })
  (do { if (effects.push(2), false) return 1; 'arg' });
}

function f2(a) {
  (do { if (effects.push(1), false) return 0; ({ key: (arg) => effects.push(arg) }) })
  [do { if (effects.push(2), a) return 1; 'key' }]
  (...do { if (effects.push(3), false) return [2]; ['arg'] });
}

effects = [];
expect(f1()).toBe(undefined);
expect(effects).toEqual([1, 2, 'arg']);

effects = [];
expect(f1(1)).toBe(0);
expect(effects).toEqual([1]);

effects = [];
expect(f2()).toBe(undefined);
expect(effects).toEqual([1, 2, 3, 'arg']);

effects = [];
expect(f2(1)).toBe(1);
expect(effects).toEqual([1, 2]);
