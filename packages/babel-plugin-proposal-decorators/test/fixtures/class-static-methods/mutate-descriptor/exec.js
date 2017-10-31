function dec(target, name, descriptor) {
  assert(target);
  assert.equal(typeof name, "string");
  assert.equal(typeof descriptor, "object");

  target.decoratedProps = (target.decoratedProps || []).concat([name]);

  let value = descriptor.value;
  Object.assign(descriptor, {
    enumerable: name.indexOf("enum") !== -1,
    configurable: name.indexOf("conf") !== -1,
    writable: name.indexOf("write") !== -1,
    value: function(...args) {
      return "__" + value.apply(this, args) + "__";
    },
  });
}

class Example {
  @dec
  static enumconfwrite(){
    return 1;
  }

  @dec
  static enumconf(){
    return 2;
  }

  @dec
  static enumwrite(){
    return 3;
  }

  @dec
  static enum(){
    return 4;
  }

  @dec
  static confwrite(){
    return 5;
  }

  @dec
  static conf(){
    return 6;
  }

  @dec
  static write(){
    return 7;
  }

  @dec
  static _(){
    return 8;
  }
}

assert(Example.hasOwnProperty("decoratedProps"));
assert.deepEqual(Example.decoratedProps, [
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

assert(descs.enumconfwrite.enumerable);
assert(descs.enumconfwrite.writable);
assert(descs.enumconfwrite.configurable);
assert.equal(Example.enumconfwrite(), "__1__");

assert(descs.enumconf.enumerable);
assert.equal(descs.enumconf.writable, false);
assert(descs.enumconf.configurable);
assert.equal(Example.enumconf(), "__2__");

assert(descs.enumwrite.enumerable);
assert(descs.enumwrite.writable);
assert.equal(descs.enumwrite.configurable, false);
assert.equal(Example.enumwrite(), "__3__");

assert(descs.enum.enumerable);
assert.equal(descs.enum.writable, false);
assert.equal(descs.enum.configurable, false);
assert.equal(Example.enum(), "__4__");

assert.equal(descs.confwrite.enumerable, false);
assert(descs.confwrite.writable);
assert(descs.confwrite.configurable);
assert.equal(Example.confwrite(), "__5__");

assert.equal(descs.conf.enumerable, false);
assert.equal(descs.conf.writable, false);
assert(descs.conf.configurable);
assert.equal(Example.conf(), "__6__");

assert.equal(descs.write.enumerable, false);
assert(descs.write.writable);
assert.equal(descs.write.configurable, false);
assert.equal(Example.write(), "__7__");

assert.equal(descs._.enumerable, false);
assert.equal(descs._.writable, false);
assert.equal(descs._.configurable, false);
assert.equal(Example._(), "__8__");
