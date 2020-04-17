function dec(target, name, descriptor) {
  expect(target).toBeTruthy();
  expect(typeof name).toBe("string");
  expect(typeof descriptor).toBe("object");

  target.decoratedProps = (target.decoratedProps || []).concat([name]);

  let value = descriptor.value;
  return {
    enumerable: name.indexOf('enum') !== -1,
    configurable: name.indexOf('conf') !== -1,
    writable: name.indexOf('write') !== -1,
    value: function(...args){
      return '__' + value.apply(this, args) + '__';
    },
  };
}

class Example {
  @dec
  static enumconfwrite() {
    return 1;
  }

  @dec
  static enumconf() {
    return 2;
  }

  @dec
  static enumwrite() {
    return 3;
  }

  @dec
  static enum() {
    return 4;
  }

  @dec
  static confwrite() {
    return 5;
  }

  @dec
  static conf() {
    return 6;
  }

  @dec
  static write() {
    return 7;
  }

  @dec
  static _() {
    return 8;
  }
}


expect(Example).toHaveProperty("decoratedProps");
expect(Example.decoratedProps).toEqual([
  "enumconfwrite",
  "enumconf",
  "enumwrite",
  "enum",
  "confwrite",
  "conf",
  "write",
  "_",
]);

const descs = Object.getOwnPropertyDescriptors(Example);

expect(descs.enumconfwrite.enumerable).toBeTruthy();
expect(descs.enumconfwrite.writable).toBeTruthy();
expect(descs.enumconfwrite.configurable).toBeTruthy();
expect(Example.enumconfwrite()).toBe("__1__");

expect(descs.enumconf.enumerable).toBeTruthy();
expect(descs.enumconf.writable).toBe(false);
expect(descs.enumconf.configurable).toBeTruthy();
expect(Example.enumconf()).toBe("__2__");

expect(descs.enumwrite.enumerable).toBeTruthy();
expect(descs.enumwrite.writable).toBeTruthy();
expect(descs.enumwrite.configurable).toBe(false);
expect(Example.enumwrite()).toBe("__3__");

expect(descs.enum.enumerable).toBeTruthy();
expect(descs.enum.writable).toBe(false);
expect(descs.enum.configurable).toBe(false);
expect(Example.enum()).toBe("__4__");

expect(descs.confwrite.enumerable).toBe(false);
expect(descs.confwrite.writable).toBeTruthy();
expect(descs.confwrite.configurable);
expect(Example.confwrite()).toBe("__5__");

expect(descs.conf.enumerable).toBe(false);
expect(descs.conf.writable).toBe(false);
expect(descs.conf.configurable).toBeTruthy();
expect(Example.conf()).toBe("__6__");

expect(descs.write.enumerable).toBe(false);
expect(descs.write.writable).toBeTruthy();
expect(descs.write.configurable).toBe(false);
expect(Example.write()).toBe("__7__");

expect(descs._.enumerable).toBe(false);
expect(descs._.writable).toBe(false);
expect(descs._.configurable).toBe(false);
expect(Example._()).toBe("__8__");
