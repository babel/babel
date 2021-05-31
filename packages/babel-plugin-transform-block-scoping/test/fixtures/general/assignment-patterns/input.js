const foo = "foo";

function foobar() {
  for (let item of [1, 2, 3]) {
    let foo = "bar";
    [bar, foo] = [1, 2];
  }
}
