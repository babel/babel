expect(() => {
  function f(i) {
    if (i) f(i - 1);
    x;
  }

  f(3);
  let x;
}).toThrow(ReferenceError);
