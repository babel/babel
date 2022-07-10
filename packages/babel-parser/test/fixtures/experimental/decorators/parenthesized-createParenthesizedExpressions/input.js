@(foo().bar)
class Foo {
  @(member[expression]) method() {}

  @(foo + bar) method2() {}

  @(this.foo)(bar) method3() {}
}
