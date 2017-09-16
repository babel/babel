function noopClassDec(constructor, heritage, elements) {
  return {constructor, elements, finishers: []}
}

function noopMethodDec(descriptor) {
  return {descriptor, extras: [], finishers: []}
}

@noopClassDec class Bar {
  @noopMethodDec foo() {}
}

@noopClassDec class Foo {
  @noopMethodDec bar() {}
}

let x = new Foo();

assert.ok(x instanceof Foo);
assert.ok(x instanceof Bar);
