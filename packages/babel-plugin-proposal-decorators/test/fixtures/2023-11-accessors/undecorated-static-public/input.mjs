const dec = () => {}; 
class Foo {
  static accessor a;

  static accessor b = 123;

  static accessor ['c'] = 456;
}

Foo = class {
  static accessor a;

  static accessor b = 123;

  static accessor ['c'] = 456;
}

export default class {
  static accessor a;

  static accessor b = 123;

  static accessor ['c'] = 456;
}
