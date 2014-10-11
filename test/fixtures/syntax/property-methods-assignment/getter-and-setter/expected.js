var obj = function (_ref) {
  Object.defineProperties(_ref, {
    foo: {
      get: function () {
        return 5 + 5;
      },
      set: function (value) {
        this._foo = value;
      }
    }
  });
  return _ref;
}({});
