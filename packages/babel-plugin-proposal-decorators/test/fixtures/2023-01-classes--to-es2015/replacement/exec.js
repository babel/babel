
let replaced;

function dec(Klass) {
  replaced = class extends Klass {};

  return replaced;
}

@dec
class Foo {
  static foo = new Foo();
}

const foo = new Foo();

expect(Foo).toBe(replaced);
expect(Foo.foo).toBeInstanceOf(replaced);
expect(foo).toBeInstanceOf(replaced);
