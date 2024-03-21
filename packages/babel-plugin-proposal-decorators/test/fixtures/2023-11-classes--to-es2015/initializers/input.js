const dec = () => {}; 
@dec
class Foo {
  static field = 123;
}

@dec
class Bar extends Foo {
  static {
    this.otherField = 456;
  }

  static field = 123;
}
