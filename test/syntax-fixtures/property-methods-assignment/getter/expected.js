var obj = function (obj) {
  Object.defineProperties(obj, {
    foo: {
      get: function () {
        return 5 + 5;
      }
    }
  });
  return obj;
}({});
