(function() {
  var x = 1;
  function f() {
    expect(x).toBe(1);
    {
      let x = 2;
      expect(x).toBe(2);
    }
    expect(x).toBe(1);
  }
  f();
})();
