var _slice = Array.prototype.slice;

function foo() {
  return bar.apply(null, ["test"].concat(_slice.call(arguments)));
}
function bar(one, two, three) {
  return [
    one,
    two,
    three
  ];
}
foo("foo", "bar");
