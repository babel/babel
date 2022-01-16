const key = Symbol();

function dec(_, { setMetadata }) {
  setMetadata(key, 123);
}

class Foo {
  @dec #a;
}

class Bar extends Foo {
  @dec #b;
}

expect(Foo.prototype[Symbol.for("Symbol.metadata")][key].private).toEqual([123]);
expect(Bar.prototype[Symbol.for("Symbol.metadata")][key].private).toEqual([123, 123]);
