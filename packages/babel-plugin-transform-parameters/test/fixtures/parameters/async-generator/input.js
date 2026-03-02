async function* f([]) {};

expect(() => {
  f();
}).toThrow(TypeError);
