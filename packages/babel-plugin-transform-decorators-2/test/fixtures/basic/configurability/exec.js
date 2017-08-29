function set(prop, value) {
  return function(descriptor) {
    descriptor.descriptor[prop] = value;
    return {descriptor, extras: [], finishers: []};
  }
}

const msg = "Decorator tried to change unconfigurable property descriptor";

assert.throws(() => {
  class Foo {
    @set('configurable', true) @set('configurable', false) method() {}
  }
}, msg);

assert.throws(() => {
  class Foo {
    @set('writable', false) @set('configurable', false) method() {}
  }
}, msg);

assert.throws(() => {
  class Foo {
    @set('enumerable', true) @set('configurable', false) method() {}
  }
}, msg);

assert.throws(() => {
  class Foo {
    @set('value', (x) => x) @set('configurable', false) method() {}
  }
}, msg);

assert.doesNotThrow(() => {
  class Foo {
    @set('configurable', true) method1() {}
    @set('writable', true) method2() {}
    @set('enumerable', false) method3() {}
  }
}, msg);
