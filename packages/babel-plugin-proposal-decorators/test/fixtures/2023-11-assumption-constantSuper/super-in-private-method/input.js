const dec = () => {}; 
class Foo extends Bar {
  @dec
  #x() {
    return super.foo();
  }
}
