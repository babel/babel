() => {
  class Foo {
    fn = () => console.log(this);
    static fn = () => console.log(this);
  }
};

() => class Bar {
  fn = () => console.log(this);
  static fn = () => console.log(this);
};

() => {
  class Baz {
    fn = () => console.log(this);
    force = force
    static fn = () => console.log(this);

    constructor(force) {}
  }
};

var qux = function() {
  class Qux {
    fn = () => console.log(this);
    static fn = () => console.log(this);
  }
}.bind(this)
