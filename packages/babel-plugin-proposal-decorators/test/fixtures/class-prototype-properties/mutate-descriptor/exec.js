function dec(target, name, descriptor) {
  expect(target).toBeTruthy();
  expect(typeof name).toBe("string");
  expect(typeof descriptor).toBe("object");

  target.decoratedProps = (target.decoratedProps || []).concat([name]);

  let initializer = descriptor.initializer;
  Object.assign(descriptor, {
    enumerable: name.indexOf('enum') !== -1,
    configurable: name.indexOf('conf') !== -1,
    writable: name.indexOf('write') !== -1,
    initializer: function(...args){
      return '__' + initializer.apply(this, args) + '__';
    },
  });
}

class Example {
  @dec
  enumconfwrite = 1;

  @dec
  enumconf = 2;

  @dec
  enumwrite = 3;

  @dec
  enum = 4;

  @dec
  confwrite = 5;

  @dec
  conf = 6;

  @dec
  write = 7;

  @dec
  _ = 8;
}

const inst = new Example();

expect(Example.prototype).toHaveProperty("decoratedProps");
expect(inst.decoratedProps).toEqual([
  "enumconfwrite",
  "enumconf",
  "enumwrite",
  "enum",
  "confwrite",
  "conf",
  "write",
  "_",
]);

const descs = Object.getOwnPropertyDescriptors(inst);

expect(descs.enumconfwrite.enumerable).toBeTruthy();
expect(descs.enumconfwrite.writable).toBeTruthy();
expect(descs.enumconfwrite.configurable).toBeTruthy();
expect(inst.enumconfwrite).toBe("__1__");

expect(descs.enumconf.enumerable).toBeTruthy();
expect(descs.enumconf.writable).toBe(false);
expect(descs.enumconf.configurable).toBeTruthy();
expect(inst.enumconf).toBe("__2__");

expect(descs.enumwrite.enumerable).toBeTruthy();
expect(descs.enumwrite.writable).toBeTruthy();
expect(descs.enumwrite.configurable).toBe(false);
expect(inst.enumwrite).toBe("__3__");

expect(descs.enum.enumerable).toBeTruthy();
expect(descs.enum.writable).toBe(false);
expect(descs.enum.configurable).toBe(false);
expect(inst.enum).toBe("__4__");

expect(descs.confwrite.enumerable).toBe(false);
expect(descs.confwrite.writable).toBeTruthy();
expect(descs.confwrite.configurable).toBeTruthy();
expect(inst.confwrite).toBe("__5__");

expect(descs.conf.enumerable).toBe(false);
expect(descs.conf.writable).toBe(false);
expect(descs.conf.configurable).toBeTruthy();
expect(inst.conf).toBe("__6__");

expect(descs.write.enumerable).toBe(false);
expect(descs.write.writable).toBeTruthy();
expect(descs.write.configurable).toBe(false);
expect(inst.write).toBe("__7__");

expect(descs._.enumerable).toBe(false);
expect(descs._.writable).toBe(false);
expect(descs._.configurable).toBe(false);
expect(inst._).toBe("__8__");
