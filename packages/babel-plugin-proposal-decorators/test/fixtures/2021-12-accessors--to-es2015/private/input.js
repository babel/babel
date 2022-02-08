const dec = () => {}; 
class Foo {
  @dec
  accessor #a;

  @dec
  accessor #b = 123;
}
