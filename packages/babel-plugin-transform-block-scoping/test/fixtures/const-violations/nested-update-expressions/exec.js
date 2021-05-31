expect(function() {
  const c = 17;
  let a = 0;

  function f() {
    return ++c+--a;
  }

  f();

}).toThrow('"c" is read-only');
