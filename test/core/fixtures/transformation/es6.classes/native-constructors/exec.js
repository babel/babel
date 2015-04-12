class Foo extends Array {

}

class Bar extends Array {
  constructor() {
    super();
    this.foo = "bar";
  }
}

var foo = new Foo;
assert.ok(Array.isArray(foo));
foo.push(1);
foo.push(2);
assert.equal(foo[0], 1);
assert.equal(foo[1], 2);
assert.equal(foo.length, 2);

var bar = new Bar;
assert.ok(Array.isArray(bar));
assert.equal(bar.foo, "bar");
bar.push(1);
bar.push(2);
assert.equal(bar[0], 1);
assert.equal(bar[1], 2);
assert.equal(bar.length, 2);
