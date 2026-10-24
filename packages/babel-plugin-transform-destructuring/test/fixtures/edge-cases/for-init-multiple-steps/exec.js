var obj = { d: 1 }, x = {}, y = {}, z = {};

for (var { a: void } = obj, b = 1; b < 2; b++);
expect(b).toBe(2);

for (var {} = x, {} = y; ; ) break;

for (var c = 1, {} = z; c < 2; c++);
expect(c).toBe(2);

for (var { d } = obj, {} = z, e = d; ; ) break;
expect([d, e]).toEqual([1, 1]);

// a declarator without initializer after a null check
for (var { a: void } = obj, f; ; ) break;
expect(f).toBe(undefined);

// several null checks after the last declarator
for (var g = 1, {} = y, {} = z; ; ) break;
expect(g).toBe(1);
expect(() => {
  for (var h = 1, {} = y, {} = null; ; ) break;
}).toThrow(TypeError);

expect(() => {
  for (var { a: void } = null, f = 1; ; ) break;
}).toThrow(TypeError);
expect(() => {
  for (var g = 1, {} = null; ; ) break;
}).toThrow(TypeError);
