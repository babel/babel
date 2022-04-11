expect(() => {
  const key = 'test';

  function dec(_, { setMetadata }) {
    setMetadata(key, 123);
  }

  @dec
  class Foo {}
}).toThrow('Metadata keys must be symbols, received: test')
