var Test = function () {
  function Test() {
  }
  Object.defineProperties(Test.prototype, {
    test: {
      get: function () {
        return 5 + 5;
      }
    }
  });
  return Test;
}();
