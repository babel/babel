var value;

class Foo {
  foo() {
    value = 1;
  }
}

var foo = new Foo();
foo.foo = function() { value = 2; };
foo.foo();
assert.equal(value, 2);
