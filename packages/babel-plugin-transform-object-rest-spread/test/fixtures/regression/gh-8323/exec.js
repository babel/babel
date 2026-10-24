var missiles = 0;
function fireTheMissiles() {
  missiles++;
}

const get = () => {
  fireTheMissiles();
  return 3;
};

const f = ({ a = get(), b, c, ...z }) => {
  const v = b + 3;
};

expect(f({ b: 1, c: 2, d: 3 })).toBeUndefined();
expect(missiles).toBe(1);
f({ a: 0, b: 1 });
expect(missiles).toBe(1);
f({ a: undefined, b: 1 });
expect(missiles).toBe(2);
f({ a: null });
expect(missiles).toBe(2);

expect(() => f(null)).toThrow(TypeError);
expect(() => f()).toThrow(TypeError);
expect(missiles).toBe(2);
