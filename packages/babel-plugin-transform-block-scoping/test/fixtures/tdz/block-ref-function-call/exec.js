expect(() => {
  f();

  const f = function f() {}
}).toThrow(ReferenceError);
