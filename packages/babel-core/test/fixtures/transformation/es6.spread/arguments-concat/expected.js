function foo() {
  return bar.apply(undefined, ["test"].concat(Array.prototype.slice.call(arguments)));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
