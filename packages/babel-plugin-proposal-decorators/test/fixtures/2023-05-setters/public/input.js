const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  set a(v) {
    return this.value = v;
  }

  @dec
  set ['b'](v) {
    return this.value = v;
  }
}
