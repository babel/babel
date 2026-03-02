const dec = () => {}; 
class Foo {
  @dec
  [getKey()]() {
    return 1;
  }

  @dec
  [getKey()]() {
    return 2;
  }
}
