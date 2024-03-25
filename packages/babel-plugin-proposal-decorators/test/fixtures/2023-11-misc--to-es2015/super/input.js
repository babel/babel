function decorate() {
  return function (target, context) {}
}

class Test {
  @decorate()
  accessor foo = 42;

  constructor() {
    console.log('hello');
  }
}

new Test()

class TestChild extends Test {
  @decorate()
  accessor bar = 1;

  constructor() {
    super();
  }
}

const r = new TestChild();
