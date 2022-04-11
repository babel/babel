var foo = "foo";

function foobar() {
  for (var item of [1, 2, 3]) {
    var _foo = "bar";
    [bar, _foo] = [1, 2];
  }
}
