class Foo {
  bar() {
    return Foo;
  }
}

var Bar = Foo;
Foo = 5;
assert.throws(function () {
  Bar.call(6);
}, /Cannot call a class as a function/);
