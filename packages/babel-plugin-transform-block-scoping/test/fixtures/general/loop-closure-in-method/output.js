var objects = [];
var i2 = 0;
var _loop = function () {
  var captured = i2;
  i2++;
  objects.push({
    foo() {
      return captured;
    }
  });
};
for (var i = 0; i < 10; i++) {
  _loop();
}
expect(objects[0].foo()).toBe(0);
expect(objects[1].foo()).toBe(1);
