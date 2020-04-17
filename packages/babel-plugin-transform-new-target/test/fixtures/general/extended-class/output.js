class Foo {
  constructor() {
    this.constructor;
  }

}

class Bar extends Foo {
  constructor() {
    // This is probably bad...
    this.constructor;
    super();
  }

}

class Baz extends Foo {
  constructor() {
    super();
    this.constructor;
  }

}
