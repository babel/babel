expect(() => {
  function f() { x }
  Math.random() === 2 && f();
  let x;
  f();
}).not.toThrow();
