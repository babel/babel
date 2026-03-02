// This should print "true true true"
async function test() {
  class Foo { foo() { return this } }
  class Bar extends Foo {
    a = async () => super.foo``
    b = async () => super['foo']``
    c = async (foo) => super[foo]``
  }
  const bar = new Bar
  console.log(
    (await bar.a()) === bar,
    (await bar.b()) === bar,
    (await bar.c('foo')) === bar,
  )
}
test()
