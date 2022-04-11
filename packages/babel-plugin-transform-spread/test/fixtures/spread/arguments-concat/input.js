function foo() {
  return bar("test", ...arguments);
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
