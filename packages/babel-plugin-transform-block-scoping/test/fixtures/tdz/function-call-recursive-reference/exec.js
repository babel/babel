expect(() => {
  function f(i) {
    return () => {
      x;
      f(i - 1);
    };
  }

  const g = f(1);
  let x;
  g();
}).not.toThrow();
