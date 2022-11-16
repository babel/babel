var foo = "foo";
function foobar() {
  for (var item of [1, 2, 3]) {
    var foo = "bar";
    [bar, foo] = [1, 2];
  }
}
