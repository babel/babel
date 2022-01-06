const key = Symbol();

function dec1(_, { setMetadata, getMetadata }) {
  expect(getMetadata(key)).toBe(undefined);
  setMetadata(key, 123);
  expect(getMetadata(key)).toBe(123);
}

function dec2(_, { setMetadata, getMetadata }) {
  expect(getMetadata(key)).toBe(123);
  setMetadata(key, 456);
  expect(getMetadata(key)).toBe(456);
}

class Foo {
  @dec1 @dec2 a;
}

function dec3(_, { setMetadata, getMetadata }) {
  expect(getMetadata(key)).toBe(undefined);
  setMetadata(key, 789);
  expect(getMetadata(key)).toBe(789);
}

class Bar extends Foo {
  @dec3 a;
}

expect(Foo.prototype[Symbol.metadata][key].public.a).toBe(456);
expect(Bar.prototype[Symbol.metadata][key].public.a).toBe(789);
