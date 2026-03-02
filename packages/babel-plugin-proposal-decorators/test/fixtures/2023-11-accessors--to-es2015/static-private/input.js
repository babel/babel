const dec = () => {}; 
class Foo {
  @dec
  static accessor #a;

  @dec
  static accessor #b = 123;
}
