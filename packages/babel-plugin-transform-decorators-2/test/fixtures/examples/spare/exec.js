// makes an undecorated copy of the method
function spare(name, isStatic) {
  return function(descriptor) {
    const clone = {
      kind: "property",
      isStatic: !!isStatic,
      key: name,
      descriptor: Object.assign({}, descriptor)
    }
    return {descriptor, extras: [clone], finishers: []};
  }
}

function overrider(fn) {
  return function(descriptor) {
    descriptor.value = fn;
    return {descriptor, extras: [], finishers: []};
  }
}

class Foo {
  @overrider(() => 3) @spare("spared") method() {
    return 2; 
  }
}

const x = new Foo();

assert.equal(x.spared(), 2);
assert.equal(x.method(), 3);
