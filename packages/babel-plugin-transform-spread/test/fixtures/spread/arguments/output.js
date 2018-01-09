function foo() {
  return bar.apply(void 0, arguments);
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
