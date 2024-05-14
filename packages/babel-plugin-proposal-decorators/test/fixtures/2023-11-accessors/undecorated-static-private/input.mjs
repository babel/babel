const dec = () => {}; 
class Foo {
  static accessor #a;

  static accessor #b = 123;
}

Foo = class {
  static accessor #a;

  static accessor #b = 123;
}

export default class {
  static accessor #a;

  static accessor #b = 123;
}
