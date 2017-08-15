function dec(descriptor) {
  const extra = {
    kind: "property",
    key: "magic",
    isStatic: false,
    descriptor: {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function () {return "extra"}
    }
  }
  
  const extraStatic = {
    kind: "property",
    key: "magic",
    isStatic: true,
    descriptor: {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function () {return "extraStatic"}
    }
  }

  return {descriptor, extras: [extra, extraStatic], finishers: []}
}

class Foo {
  @dec method() {return "method"}
}

var x = new Foo();

assert.equal(x.method(), "method");
assert.equal(x.magic(), "extra");
assert.equal(Foo.magic(), "extraStatic");
