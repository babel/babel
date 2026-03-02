let replaced;

function dec(Klass) {
  replaced = class extends Klass {};

  return replaced;
}

const Foo = @dec class Bar {
  static bar = new Bar();
};

const foo = new Foo();

expect(Foo).toBe(replaced);
expect(Foo.bar).toBeInstanceOf(replaced);
expect(foo).toBeInstanceOf(replaced);
