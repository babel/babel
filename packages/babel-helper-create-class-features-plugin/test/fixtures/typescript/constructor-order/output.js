class Foo {
  constructor(incoming) {
    this.incoming = incoming;
    babelHelpers.defineProperty(this, "value", this.incoming);
  }
}
