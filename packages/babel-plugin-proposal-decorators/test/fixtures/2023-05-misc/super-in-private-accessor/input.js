const dec = () => {}; 
class Foo extends Bar {
  @dec
  get #x() {
    return super.foo();
  }
}
