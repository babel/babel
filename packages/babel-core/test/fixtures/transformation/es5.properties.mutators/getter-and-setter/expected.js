var obj = Object.defineProperties({}, {
  foo: {
    get: function () {
      return 5 + 5;
    },
    set: function (value) {
      this._foo = value;
    },
    configurable: true,
    enumerable: true
  }
});
