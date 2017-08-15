function overrider(fn) {
  return function(descriptor) {
    descriptor.value = fn;
    return {descriptor, extras: [], finishers: []};
  }
}

class Foo {
  @overrider(() => 3) method() {
    return 2;
  }
}

const x = new Foo();
assert.equal(x.method(), 3);


