expect(() => {
  f();

  function f() {}
}).not.toThrow();
