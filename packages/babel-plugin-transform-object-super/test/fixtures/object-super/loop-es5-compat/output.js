var objects = [];
var _loop = function () {
  var _obj;
  if (true) {
    objects.push(_obj = {
      __proto__: proto,
      foo: function () {
        return babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "x", this);
      }
    });
  }
};
for (var proto of [{
  x: 0
}, {
  x: 1
}]) {
  _loop();
}
expect(objects[0].foo()).toBe(0);
expect(objects[1].foo()).toBe(1);
