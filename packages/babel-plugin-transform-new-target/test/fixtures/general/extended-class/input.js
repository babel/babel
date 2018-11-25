class Foo {
  constructor() {
    new.target;
  }
}

class Bar extends Foo {
  constructor() {
    // This is probably bad...
    new.target;
    super();
  }
}

class Baz extends Foo {
  constructor() {
    super();
    new.target;
  }
}
