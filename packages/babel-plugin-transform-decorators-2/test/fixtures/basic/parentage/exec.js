function noopClassDec(constructor, heritage, elements) {
  return {constructor, elements, finishers: []}
}

function noopMethodDec(descriptor) {
  return {descriptor, extras: [], finishers: []}
}

@noopClassDec class Bar {
  @noopMethodDec foo() {}
}

@noopClassDec class Foo extends Bar {
  @noopMethodDec bar() {}
}

let x = new Foo();
let y = new Bar();

assert.ok(x instanceof Foo);
assert.ok(x instanceof Bar);

assert.ok(y instanceof Bar);
assert.equal(y instanceof Foo, false);
