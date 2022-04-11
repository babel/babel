expect(() => {
  function f(i) {
    if (i) f(i - 1);
    x;
  }

  let x;
  f(3);
}).not.toThrow();
