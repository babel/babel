const targets = [];
function Foo() {
  targets.push(new.target);
}

function Bar() {
  Foo.call(this);
}
Bar.prototype = Object.create(Foo.prototype, {
  constructor: {
    value: Bar,
    writable: true,
    configurable: true,
  }
});

function Baz() {}

Reflect.construct(Foo, []);
Reflect.construct(Foo, [], Bar);
Reflect.construct(Bar, []);
Reflect.construct(Bar, [], Baz);
Reflect.construct(Foo, [], Baz);

expect(targets[0]).toBe(Foo);

expect(targets[1]).toBe(Bar);

expect(() => {
  // Wish we could support this...
  // Then again, this is what a transformed class does.
  expect(targets[2]).toBeUndefined();
}).toThrow();

expect(targets[3]).toBeUndefined();

expect(() => {
  // Wish we could support this...
  expect(targets[4]).toBe(Baz);
}).toThrow();
