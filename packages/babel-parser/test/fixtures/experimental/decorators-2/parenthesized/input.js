@(foo().bar)
class Foo {
  @(member[expression]) method() {}

  @(foo + bar) method2() {}

  @(this).bar method3() {}
}
