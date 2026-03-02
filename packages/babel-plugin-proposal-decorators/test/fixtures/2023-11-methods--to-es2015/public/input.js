const dec = () => {}; 
class Foo {
  value = 1;

  @dec
  a() {
    return this.value;
  }

  @dec
  ['b']() {
    return this.value;
  }
}
