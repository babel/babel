(function() {

  function* f() {
    function g() {
      return 42;
    }
    yield g;
  }

  assert.equal(42, f().next().value());

})();
