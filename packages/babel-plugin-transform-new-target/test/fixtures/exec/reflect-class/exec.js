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

assert.equal(targets[0], Foo);

assert.equal(targets[1], Bar);

assert.equal(targets[2], Bar);

assert.equal(targets[3], Baz);

assert.equal(targets[4], Baz);
