const key = Symbol();

function dec(_, { setMetadata }) {
  setMetadata(key, 123);
}

class Foo {
  @dec a;
}

class Bar extends Foo {
  @dec b;
}

expect(Foo.prototype[Symbol.for("Symbol.metadata")][key].public.a).toEqual(123);
expect(Foo.prototype[Symbol.for("Symbol.metadata")][key].public.b).toEqual(undefined);
expect(Bar.prototype[Symbol.for("Symbol.metadata")][key].public.a).toEqual(123);
expect(Bar.prototype[Symbol.for("Symbol.metadata")][key].public.b).toEqual(123);
