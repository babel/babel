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

assert.equal(targets[0], Foo);

assert.equal(targets[1], Bar);

assert.throws(() => {
  // Wish we could support this...
  // Then again, this is what a transformed class does.
  assert.equal(targets[2], undefined);
});

assert.equal(targets[3], undefined);

assert.throws(() => {
  // Wish we could support this...
  assert.equal(targets[4], Baz);
});
