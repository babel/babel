class Foo {
  create() {

  }
}

class Test extends Foo {
  constructor() {
    super();
  }

  create() {
    new super.create();
  }
}

const test = new Test();

assert.throws(() => new test.create(), "Cannot instantiate a class method");