expect(() => {
  function f() {
    x;
  }
  let x;
  f();
}).not.toThrow();
