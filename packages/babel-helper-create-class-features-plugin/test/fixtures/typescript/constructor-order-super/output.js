class Foo {}
class Foo2 extends Foo {
  constructor(incoming) {}
}
class Foo3 extends Foo {
  constructor(incoming) {
    super();
    this.incoming = incoming;
    babelHelpers.defineProperty(this, "value", this.incoming);
  }
}
class Foo4 extends Foo {
  constructor(incoming) {
    if (1) {
      super();
      this.incoming = incoming;
      babelHelpers.defineProperty(this, "value", this.incoming);
    } else {
      super();
      this.incoming = incoming;
      babelHelpers.defineProperty(this, "value", this.incoming);
    }
  }
}
class Foo5 extends Foo {
  constructor(incoming) {
    var c = a ? (super(), (this.incoming = incoming, babelHelpers.defineProperty(this, "value", this.incoming)), this) : b;
  }
}
