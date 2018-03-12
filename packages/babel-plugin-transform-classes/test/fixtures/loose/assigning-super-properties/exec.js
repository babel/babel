class Foo {}

class Test extends Foo {
  constructor() {
    super();
    super.test = 1;
  }
}

const obj = new Test();

expect(obj.test).toBe(1);