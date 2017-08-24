// makes an undecorated copy of the method
function spare(name, isStatic) {
  return function(descriptor) {
    name = name || descriptor.key + "_spare";
    const clone = {
      kind: "property",
      isStatic: !!isStatic,
      key: name,
      descriptor: Object.assign({}, descriptor.descriptor)
    }
    return {descriptor, extras: [clone], finishers: []};
  }
}

function overrider(fn) {
  return function(descriptor) {
    descriptor.descriptor.value = fn;
    return {descriptor, extras: [], finishers: []};
  }
}

class Foo {
  @overrider(() => 3) @spare() method() {
    return 2; 
  }
}

const x = new Foo();

assert.equal(x.method_spare(), 2);
assert.equal(x.method(), 3);
