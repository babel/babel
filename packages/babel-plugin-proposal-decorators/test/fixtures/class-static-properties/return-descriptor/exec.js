function dec(target, name, descriptor) {
  assert(target);
  assert.equal(typeof name, "string");
  assert.equal(typeof descriptor, "object");

  target.decoratedProps = (target.decoratedProps || []).concat([name]);

  let initializer = descriptor.initializer;
  return {
    enumerable: name.indexOf('enum') !== -1,
    configurable: name.indexOf('conf') !== -1,
    writable: name.indexOf('write') !== -1,
    initializer: function(...args){
      return '__' + initializer.apply(this, args) + '__';
    },
  };
}

class Example {
  @dec
  static enumconfwrite = 1;

  @dec
  static enumconf = 2;

  @dec
  static enumwrite = 3;

  @dec
  static enum = 4;

  @dec
  static confwrite = 5;

  @dec
  static conf = 6;

  @dec
  static write = 7;

  @dec
  static _ = 8;
}

const inst = new Example();

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
assert.equal(Example.enumconfwrite, "__1__");

assert(descs.enumconf.enumerable);
assert.equal(descs.enumconf.writable, false);
assert(descs.enumconf.configurable);
assert.equal(Example.enumconf, "__2__");

assert(descs.enumwrite.enumerable);
assert(descs.enumwrite.writable);
assert.equal(descs.enumwrite.configurable, false);
assert.equal(Example.enumwrite, "__3__");

assert(descs.enum.enumerable);
assert.equal(descs.enum.writable, false);
assert.equal(descs.enum.configurable, false);
assert.equal(Example.enum, "__4__");

assert.equal(descs.confwrite.enumerable, false);
assert(descs.confwrite.writable);
assert(descs.confwrite.configurable);
assert.equal(Example.confwrite, "__5__");

assert.equal(descs.conf.enumerable, false);
assert.equal(descs.conf.writable, false);
assert(descs.conf.configurable);
assert.equal(Example.conf, "__6__");

assert.equal(descs.write.enumerable, false);
assert(descs.write.writable);
assert.equal(descs.write.configurable, false);
assert.equal(Example.write, "__7__");

assert.equal(descs._.enumerable, false);
assert.equal(descs._.writable, false);
assert.equal(descs._.configurable, false);
assert.equal(Example._, "__8__");
