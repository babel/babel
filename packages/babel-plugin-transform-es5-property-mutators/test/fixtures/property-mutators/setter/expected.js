var obj = Object.defineProperties({}, {
  foo: {
    set: function (value) {
      this._foo = value;
    },
    configurable: true,
    enumerable: true
  }
});
