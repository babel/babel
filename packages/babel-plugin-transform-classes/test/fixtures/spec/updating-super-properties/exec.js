class Foo {}

class Test extends Foo {
  constructor() {
    super();
    super.test = 0;
  }

  inc() {
    super.test++;
  }
}

const obj = new Test();
obj.inc();

expect(obj.test).toBe(1);