class Foo {
  get #tag() {
    return () => this;
  }
}

new Foo();