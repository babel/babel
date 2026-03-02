const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static get a() {
    return this.value;
  }

  @dec
  static get ['b']() {
    return this.value;
  }
}
