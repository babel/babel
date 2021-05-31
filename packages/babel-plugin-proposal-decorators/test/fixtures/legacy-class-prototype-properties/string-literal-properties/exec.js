function dec(target, name, descriptor) {
  expect(target).toBeTruthy();
  expect(typeof name).toBe("string");
  expect(typeof descriptor).toBe("object");

  target.decoratedProps = (target.decoratedProps || []).concat([name]);

  return descriptor;
}

class Example {
  @dec "a-prop";
}

let inst = new Example();

expect(Example.prototype).toHaveProperty("decoratedProps");
expect(inst.decoratedProps).toEqual([
  "a-prop"
]);

expect(inst).toHaveProperty("a-prop");
expect(inst["a-prop"]).toBeUndefined();

const descs = Object.getOwnPropertyDescriptors(inst);

expect(descs["a-prop"].enumerable).toBeTruthy();
expect(descs["a-prop"].writable).toBeTruthy();
expect(descs["a-prop"].configurable).toBeTruthy();
