expect(() => {
  using foo = { [Symbol.dispose || Symbol.for("Symbol.dispose")]: 3 };
}).toThrow(TypeError);
