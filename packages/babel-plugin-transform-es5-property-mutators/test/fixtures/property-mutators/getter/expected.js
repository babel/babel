var obj = Object.defineProperties({}, {
  foo: {
    get: function () {
      return 5 + 5;
    },
    configurable: true,
    enumerable: true
  }
});
