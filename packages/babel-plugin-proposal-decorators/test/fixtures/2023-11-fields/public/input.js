const dec = () => {}; 
class Foo {
  @dec
  a;

  @dec
  b = 123;

  @dec
  ['c'] = 456;
}
