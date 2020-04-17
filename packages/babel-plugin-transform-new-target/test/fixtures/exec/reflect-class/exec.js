const targets = [];
class Foo {
  constructor() {
    targets.push(new.target);
  }
}

class Bar extends Foo {
}
class Baz {
}

Reflect.construct(Foo, []);
Reflect.construct(Foo, [], Bar);
Reflect.construct(Bar, []);
Reflect.construct(Bar, [], Baz);
Reflect.construct(Foo, [], Baz);

expect(targets[0]).toBe(Foo);

expect(targets[1]).toBe(Bar);

expect(targets[2]).toBe(Bar);

expect(targets[3]).toBe(Baz);

expect(targets[4]).toBe(Baz);
