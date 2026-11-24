class Foo {
  a = new.target;
  b = () => new.target;
  c = function () {
    return new.target;
  };

  constructor() {
    this.d = new.target;
  }
}
