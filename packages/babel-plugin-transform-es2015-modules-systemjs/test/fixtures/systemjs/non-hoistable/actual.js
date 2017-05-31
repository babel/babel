class Foo {
  constructor() { this.foo = "foo"; }
}

export function createInstance() {
  return new Foo();
}
