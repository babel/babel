// RequireObjectCoercible happens before the property name is evaluated.
const log = [];
const key = () => (log.push("key"), "a");
expect(() => {
  const { [key()]: { ...a }, ...rest } = undefined;
}).toThrow(TypeError);
expect(log).toEqual([]);

const { [key()]: { ...a }, ...rest } = { a: { x: 1 }, b: 2 };
expect([a, rest]).toEqual([{ x: 1 }, { b: 2 }]);
