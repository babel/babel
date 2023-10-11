var objects = [];
var i2 = 0;
for (var i = 0; i < 10; i++) {
  let captured = i2;
  i2++;

  objects.push({
    foo() {
      return captured;
    }
  });
}

expect(objects[0].foo()).toBe(0);
expect(objects[1].foo()).toBe(1);
