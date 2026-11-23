class Foo {
  a = new.target;
  b = () => new.target;
  c = function () {
    return new.target;
  };

  constructor() {
    this.d = new.target;
  }
}

class Sub extends Foo {}

for (const C of [Foo, Sub]) {
  const foo = new C();
  expect(foo.a).toBeUndefined();
  expect(foo.b()).toBeUndefined();
  expect(foo.c()).toBeUndefined();
  expect(new foo.c()).toBe(foo.c);
  expect(foo.d).toBe(C);
}
