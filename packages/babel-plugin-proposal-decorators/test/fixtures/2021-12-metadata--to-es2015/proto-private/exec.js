const key = Symbol();

function dec(_, { setMetadata }) {
  setMetadata(key, 123);
}

class Foo {
  @dec #a;
}

expect(Foo.prototype[Symbol.for("Symbol.metadata")][key].private[0]).toBe(123);
