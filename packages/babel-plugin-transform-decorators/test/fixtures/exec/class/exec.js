// should evaluate descriptor expressions in order

const calls = [];

function dec(id){
  calls.push(id);
  return function() {};
}

@dec(1)
@dec(2)
class Example {
  @dec(3)
  @dec(4)
  method1() {};

  @dec(5)
  @dec(6)
  prop1 = 1;

  @dec(7)
  @dec(8)
  method2() {};

  @dec(9)
  @dec(10)
  prop2 = 2;
}

assert.deepEqual(calls, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


// should call decorators in reverse order per-method

const calls2 = [];

function dec2(id){
  return function(){
    calls2.push(id);
  };
}

@dec2(10)
@dec2(9)
class Example2 {
  @dec2(2)
  @dec2(1)
  method1() {};

  @dec2(4)
  @dec2(3)
  prop1 = 1;

  @dec2(6)
  @dec2(5)
  method2() {};

  @dec2(8)
  @dec2(7)
  prop2 = 2;
}

assert.deepEqual(calls2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


// should allow returning a new constructor

function dec3(cls){
  return class Child extends cls {
    child(){}
  };
}

@dec3
class Parent {
  parent(){}
}

assert.equal(typeof Parent.prototype.parent, "function")
assert.equal(typeof Parent.prototype.child, "function")

// should allow mutating the existing constructor

function dec4(cls){
  cls.staticProp = "prop";
}

@dec4
class Parent2 {
  parent() {};
}

assert.equal(Parent2.staticProp, "prop");


// should support numeric props

function dec5(target, name, descriptor) {
  assert(target);
  assert.equal(name, 4);
  assert.equal(typeof descriptor, "object");
}

class Example3 {
  @dec5
  4() {};
}


// should support string props

function dec6(target, name, descriptor) {
  assert(target);
  assert.equal(name, "str");
  assert.equal(typeof descriptor, "object");
}

class Example4 {
   @dec6
   "str"() {};
}


// should allow returning a descriptor

function dec7(target, name, descriptor) {
  assert(target);
  assert.equal(typeof name, "string");
  assert.equal(typeof descriptor, "object");

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

class Example5 {
  @dec7
  enumconfwrite() {
    return 1;
  }

  @dec7
  enumconf() {
    return 2;
  }

  @dec7
  enumwrite() {
    return 3;
  }

  @dec7
  enum() {
    return 4;
  }

  @dec7
  confwrite() {
    return 5;
  }

  @dec7
  conf() {
    return 6;
  }

  @dec7
  write() {
    return 7;
  }

  @dec7
  _() {
    return 8;
  }
}


assert(Example5.prototype.hasOwnProperty('decoratedProps'));
assert.deepEqual(Example5.prototype.decoratedProps, [
  "enumconfwrite",
  "enumconf",
  "enumwrite",
  "enum",
  "confwrite",
  "conf",
  "write",
  "_",
]);


const inst = new Example5();

const descs = Object.getOwnPropertyDescriptors(Example5.prototype);

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


// should allow mutating the original descriptor

function dec8(target, name, descriptor) {
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

class Example6 {
  @dec8
  enumconfwrite(){
    return 1;
  }

  @dec8
  enumconf(){
    return 2;
  }

  @dec8
  enumwrite(){
    return 3;
  }

  @dec8
  enum(){
    return 4;
  }

  @dec8
  confwrite(){
    return 5;
  }

  @dec8
  conf(){
    return 6;
  }

  @dec8
  write(){
    return 7;
  }

  @dec8
  _(){
    return 8;
  }
}

assert(Example6.prototype.hasOwnProperty('decoratedProps'));
assert.deepEqual(Example6.prototype.decoratedProps, [
  "enumconfwrite",
  "enumconf",
  "enumwrite",
  "enum",
  "confwrite",
  "conf",
  "write",
  "_",
]);

const inst2 = new Example6();

const descs2 = Object.getOwnPropertyDescriptors(Example6.prototype);

assert(descs2.enumconfwrite.enumerable);
assert(descs2.enumconfwrite.writable);
assert(descs2.enumconfwrite.configurable);
assert.equal(inst2.enumconfwrite(), "__1__");

assert(descs2.enumconf.enumerable);
assert.equal(descs2.enumconf.writable, false);
assert(descs2.enumconf.configurable);
assert.equal(inst2.enumconf(), "__2__");

assert(descs2.enumwrite.enumerable);
assert(descs2.enumwrite.writable);
assert.equal(descs2.enumwrite.configurable, false);
assert.equal(inst2.enumwrite(), "__3__");

assert(descs2.enum.enumerable);
assert.equal(descs2.enum.writable, false);
assert.equal(descs2.enum.configurable, false);
assert.equal(inst2.enum(), "__4__");

assert.equal(descs2.confwrite.enumerable, false);
assert(descs2.confwrite.writable);
assert(descs2.confwrite.configurable);
assert.equal(inst2.confwrite(), "__5__");

assert.equal(descs2.conf.enumerable, false);
assert.equal(descs2.conf.writable, false);
assert(descs2.conf.configurable);
assert.equal(inst2.conf(), "__6__");

assert.equal(descs2.write.enumerable, false);
assert(descs2.write.writable);
assert.equal(descs2.write.configurable, false);
assert.equal(inst2.write(), "__7__");

assert.equal(descs2._.enumerable, false);
assert.equal(descs2._.writable, false);
assert.equal(descs2._.configurable, false);
assert.equal(inst2._(), "__8__");
