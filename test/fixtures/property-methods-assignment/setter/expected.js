var obj = function (obj) {
  Object.defineProperties(obj, {
    foo: {
      set: function (value) {
        this._foo = value;
      }
    }
  });
  return obj;
}({});
