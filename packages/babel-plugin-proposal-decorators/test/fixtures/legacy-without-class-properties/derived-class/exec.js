// The decorated field initializer must run after `super()` in a derived class.
function dec(target, name, descriptor) {}

class Base {
  constructor() {
    this.base = 1;
  }
}

class Example extends Base {
  @dec decorated = 2;
  undecorated = 3;

  constructor() {
    super();
    this.own = 4;
  }
}

const inst = new Example();

expect(inst.base).toBe(1);
expect(inst.decorated).toBe(2);
expect(inst.undecorated).toBe(3);
expect(inst.own).toBe(4);
