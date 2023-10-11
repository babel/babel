const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  get a() {
    return this.value;
  }

  @dec
  set a(v) {
    this.value = v;
  }

  @dec
  get ['b']() {
    return this.value;
  }

  @dec
  set ['b'](v) {
    this.value = v;
  }
}
