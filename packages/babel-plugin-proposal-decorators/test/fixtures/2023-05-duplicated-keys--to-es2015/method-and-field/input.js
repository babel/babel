const dec = () => {}; 
class Foo {
  @dec
  a = 123;

  @dec
  a() {
    return 1;
  }
}
