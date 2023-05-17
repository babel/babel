const dec = () => {}; 
class Foo {
  @dec
  static a;

  @dec
  static b = 123;

  @dec
  static ['c'] = 456;
}
