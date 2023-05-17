const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static get a() {
    return this.value;
  }

  @dec
  static set a(v) {
    this.value = v;
  }

  @dec
  static get ['b']() {
    return this.value;
  }

  @dec
  static set ['b'](v) {
    this.value = v;
  }
}
