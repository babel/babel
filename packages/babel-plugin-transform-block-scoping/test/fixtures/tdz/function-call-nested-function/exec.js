expect(() => {
  function f() {
    return function() { x };
  }
  let g = f();
  let x;
  g();
}).not.toThrow();

expect(() => {
  function f() {
    return function() { x };
  }
  let g = f();
  g();
  let x;
}).toThrow(ReferenceError);
