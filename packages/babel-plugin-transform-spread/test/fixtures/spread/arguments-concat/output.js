function foo() {
  var _sprd;

  return bar.apply(void 0, ((_sprd = ["test"]).push.apply(_sprd, arguments), _sprd));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
