// https://github.com/babel/babel/issues/18351
let evaluated = false;
expect(() => {
  const { [(evaluated = true, "key")]: x } = null;
}).toThrow(TypeError);
expect(evaluated).toBe(false);

expect(() => {
  ({ [(evaluated = true, "key")]: x } = undefined);
}).toThrow(TypeError);
expect(evaluated).toBe(false);

// no extra check when the first property is a plain access
const { a } = { a: 1 };
expect(a).toBe(1);
