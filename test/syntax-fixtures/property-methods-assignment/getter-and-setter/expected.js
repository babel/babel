var obj = function (obj) {
  Object.defineProperties(obj, {
    foo: {
      get: function () {
        return 5 + 5;
      },
      set: function (value) {
        this._foo = value;
      }
    }
  });
  return obj;
}({});
