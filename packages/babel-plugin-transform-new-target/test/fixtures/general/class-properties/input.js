class Foo {
  constructor() {
    this.Bar = class {
      static p = new.target
      static p1 = class { constructor() { new.target } } // should not replace
      static p2 = new function () { new.target } // should not replace
      static p3 = () => { new.target } // should replace
      q = new.target // should not replace
    }
  }

  test = function() {
    new.target;
  };

  test2 = () => {
    new.target;
  }
}
