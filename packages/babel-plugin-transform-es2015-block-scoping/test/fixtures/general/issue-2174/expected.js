if (true) {
  var x;

  (function () {
    function foo() {}
    function bar() {
      return foo;
    }
    for (x in {}) {}
  })();
}
