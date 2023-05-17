const dec = () => {}; 
@dec
class Foo {
  static {
    this
  }
  static field = this;
  static {
    this
  }
}
