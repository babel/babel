function foo() {
  var _args;

  return bar.apply(void 0, ["test"].concat(((_args = []).push.apply(_args, arguments), _args)));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
