function foo() {
  return bar(...arguments);
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
