function dec(target, name, descriptor) {
  expect(target).toBeTruthy();
  expect(typeof name).toBe("string");
  expect(typeof descriptor).toBe("object");

  target.decoratedProps = (target.decoratedProps || []).concat([name]);

  return descriptor;
}

class Example {
  @dec prop;
}

let inst = new Example();

expect(Example.prototype).toHaveProperty("decoratedProps");
expect(inst.decoratedProps).toEqual([
  "prop",
]);

expect(inst).toHaveProperty("prop");
expect(inst.prop).toBeUndefined();

const descs = Object.getOwnPropertyDescriptors(inst);

expect(descs.prop.enumerable).toBeTruthy();
expect(descs.prop.writable).toBeTruthy();
expect(descs.prop.configurable).toBeTruthy();
