function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {}

var _ = {
  writable: true,
  value: 42
};
var _2 = {
  writable: true,
  value: (() => {
    Foo.foo = _classStaticPrivateFieldSpecGet(Foo, Foo, _);
  })()
};
expect(Foo.foo).toBe(42);
