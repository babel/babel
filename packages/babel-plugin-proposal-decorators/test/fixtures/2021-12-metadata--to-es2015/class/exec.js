const key = Symbol();

function dec(_, { setMetadata }) {
  setMetadata(key, 123);
}

@dec
class Foo {}

expect(Foo[Symbol.for("Symbol.metadata")][key].constructor).toBe(123);
