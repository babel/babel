expect(() => {
  function f() { throw "should throw"; }
  import(f());
}).toThrow("should throw");

expect(() => {
  const a = {
    get x() { throw "should throw"; },
  };
  import(a.x);
}).toThrow("should throw");
