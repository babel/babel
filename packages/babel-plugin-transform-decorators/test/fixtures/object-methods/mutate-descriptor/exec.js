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

const inst = {
  @dec
  enumconfwrite(){
    return 1;
  },

  @dec
  enumconf(){
    return 2;
  },

  @dec
  enumwrite(){
    return 3;
  },

  @dec
  enum(){
    return 4;
  },

  @dec
  confwrite(){
    return 5;
  },

  @dec
  conf(){
    return 6;
  },

  @dec
  write(){
    return 7;
  },

  @dec
  _(){
    return 8;
  },
}

assert(inst.hasOwnProperty('decoratedProps'));
assert.deepEqual(inst.decoratedProps, [
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

assert(descs.enumconfwrite.enumerable);
assert(descs.enumconfwrite.writable);
assert(descs.enumconfwrite.configurable);
assert.equal(inst.enumconfwrite(), "__1__");

assert(descs.enumconf.enumerable);
assert.equal(descs.enumconf.writable, false);
assert(descs.enumconf.configurable);
assert.equal(inst.enumconf(), "__2__");

assert(descs.enumwrite.enumerable);
assert(descs.enumwrite.writable);
assert.equal(descs.enumwrite.configurable, false);
assert.equal(inst.enumwrite(), "__3__");

assert(descs.enum.enumerable);
assert.equal(descs.enum.writable, false);
assert.equal(descs.enum.configurable, false);
assert.equal(inst.enum(), "__4__");

assert.equal(descs.confwrite.enumerable, false);
assert(descs.confwrite.writable);
assert(descs.confwrite.configurable);
assert.equal(inst.confwrite(), "__5__");

assert.equal(descs.conf.enumerable, false);
assert.equal(descs.conf.writable, false);
assert(descs.conf.configurable);
assert.equal(inst.conf(), "__6__");

assert.equal(descs.write.enumerable, false);
assert(descs.write.writable);
assert.equal(descs.write.configurable, false);
assert.equal(inst.write(), "__7__");

assert.equal(descs._.enumerable, false);
assert.equal(descs._.writable, false);
assert.equal(descs._.configurable, false);
assert.equal(inst._(), "__8__");
