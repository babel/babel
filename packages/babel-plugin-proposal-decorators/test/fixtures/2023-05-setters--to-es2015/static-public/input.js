const dec = () => {}; 
class Foo {
  static value = 1;

  @dec
  static set a(v) {
    return this.value = v;
  }

  @dec
  static set ['b'](v) {
    return this.value = v;
  }
}
