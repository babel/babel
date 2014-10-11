var Test = function () {
  function Test() {
  }
  Object.defineProperties(Test.prototype, {
    test: {
      get: function () {
        return 5 + 5;
      },
      set: function (val) {
        this._test = val;
      }
    }
  });
  return Test;
}();
