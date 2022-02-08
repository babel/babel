const dec = () => {}; 
class Foo {
  @dec
  accessor a;

  @dec
  accessor b = 123;

  @dec
  accessor ['c'] = 456;
}
