const dec = () => {}; 
class Foo {
  @dec
  a() {
    return 1;
  }

  @dec
  a() {
    return 2;
  }
}
