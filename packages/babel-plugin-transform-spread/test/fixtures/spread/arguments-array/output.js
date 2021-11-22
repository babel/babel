function foo() {
  var _sprd;

  return bar(((_sprd = []).push.apply(_sprd, arguments), _sprd));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
