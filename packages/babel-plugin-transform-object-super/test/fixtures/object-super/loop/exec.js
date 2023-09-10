const objects = [];
for (const proto of [{x: 0}, {x: 1}]) {
  if(true) {
    objects.push({
      __proto__: proto,
      foo() {
        return super.x
      }
    });
  }
}
expect(objects[0].foo()).toBe(0);
expect(objects[1].foo()).toBe(1);
