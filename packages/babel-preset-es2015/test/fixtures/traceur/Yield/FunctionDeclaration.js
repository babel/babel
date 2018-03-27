(function() {

  function* f() {
    function g() {
      return 42;
    }
    yield g;
  }

  expect(f().next().value()).toBe(42);

})();
