const dec = () => {}; 
@dec
@call()
@chain.expr()
@(arbitrary + expr)
@(array[expr])
class Foo {
  #a;

  @dec
  @call()
  @chain.expr()
  @(arbitrary + expr)
  @(array[expr])
  method() {}

  makeClass() {
    return class Nested {
      @(this.#a)
      bar;
    }
  }
}
