expect(() => {
  function f() {
    x;
  }
  f();
  let x;
}).toThrow(ReferenceError);
