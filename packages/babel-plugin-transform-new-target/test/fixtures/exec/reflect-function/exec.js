const targets = [];
function Foo() {
  targets.push(new.target);
}

function Bar() {}

Reflect.construct(Foo, []);
Reflect.construct(Foo, [], Bar);

assert.equal(targets[0], Foo);

assert.throws(() => {
  // Wish we could support this...
  assert.equal(targets[1], Bar);
});
