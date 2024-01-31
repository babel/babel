const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static a() {
    return this.value;
  }

  @dec
  static ['b']() {
    return this.value;
  }
}
