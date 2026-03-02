const objects = [];
for (const proto of [{
  x: 0
}, {
  x: 1
}]) {
  let _obj;
  if (true) {
    objects.push(_obj = {
      __proto__: proto,
      foo: function () {
        return babelHelpers.superPropGet(_obj, "x", this);
      }
    });
  }
}
expect(objects[0].foo()).toBe(0);
expect(objects[1].foo()).toBe(1);
