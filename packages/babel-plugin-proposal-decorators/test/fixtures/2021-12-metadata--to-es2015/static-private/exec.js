const key = Symbol();

function dec(_, { setMetadata }) {
  setMetadata(key, 123);
}

class Foo {
  @dec static #a;
}

expect(Foo[Symbol.for("Symbol.metadata")][key].private[0]).toBe(123);
