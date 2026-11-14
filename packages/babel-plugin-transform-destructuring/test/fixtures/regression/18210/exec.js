var x = { a: 1 }, y = {};

const [{ a }, {}] = [x, y];
expect(a).toBe(1);

expect(() => {
  const [{}] = [null, {}];
}).toThrow(TypeError);

expect(() => {
  const [{ a }, {}] = [x, null];
}).toThrow(TypeError);
