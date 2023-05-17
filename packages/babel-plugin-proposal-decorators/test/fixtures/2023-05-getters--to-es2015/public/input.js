const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  get a() {
    return this.value;
  }

  @dec
  get ['b']() {
    return this.value;
  }
}
