const dec = () => {}; 
@dec
class Foo {
  static foo = new Foo();
}

const foo = new Foo();
