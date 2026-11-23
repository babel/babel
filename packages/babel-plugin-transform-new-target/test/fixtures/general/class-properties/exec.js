class Foo {
  constructor() {
    this.Bar = class {
      static p = new.target;
      static p1 = class { constructor() { this.nt = new.target; } };
      static p2 = new function () { this.nt = new.target; };
      static p3 = () => new.target;
      static p4 = function () { return new.target; };
      q = new.target;
    };
  }

  test = function () {
    return new.target;
  };

  test2 = () => new.target;
}

const foo = new Foo();
const { Bar } = foo;

expect(Bar.p).toBeUndefined();
expect(new Bar.p1().nt).toBe(Bar.p1);
expect(Bar.p2.nt).toBe(Bar.p2.constructor);
expect(Bar.p3()).toBeUndefined();
expect(Bar.p4()).toBeUndefined();
expect(new Bar.p4()).toBe(Bar.p4);
expect(new Bar().q).toBeUndefined();

expect(foo.test()).toBeUndefined();
expect(new foo.test()).toBe(foo.test);
expect(foo.test2()).toBeUndefined();

class Sub extends Foo {}
const sub = new Sub();
expect(sub.test2()).toBeUndefined();
expect(new sub.Bar().q).toBeUndefined();
