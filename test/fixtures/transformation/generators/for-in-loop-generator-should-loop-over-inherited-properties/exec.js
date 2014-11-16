function *gen() {
  var count = 0;
  function Foo() {
    this.baz = 1
  }
  Foo.prototype.bar = 2;

  var foo = new Foo();
  for (var key in foo) {
    yield [key, foo[key]];
    count += 1;
  }
  return count;
}

genHelpers.check(gen(), [["baz", 1], ["bar", 2]], 2);
