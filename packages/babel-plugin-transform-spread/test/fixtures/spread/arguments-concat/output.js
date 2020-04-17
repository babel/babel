function foo() {
  return bar.apply(void 0, ["test"].concat(Array.prototype.slice.call(arguments)));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
