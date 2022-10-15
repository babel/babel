async function test() {
  class Foo { foo() { return this } }
  class Bar extends Foo {
    a = async () => super.foo``
    b = async () => super['foo']``
    c = async (foo) => super[foo]``
  }
  const bar = new Bar
  expect(await bar.a()).toEqual(bar);
  expect(await bar.b()).toEqual(bar);
  expect(await bar.c('foo')).toEqual(bar);
}
test()
