const dec = () => {}; 
class Foo {
  @dec
  [getKeyI()]() {
    return 1;
  }

  @dec
  [getKeyJ()]() {
    return 2;
  }
}
