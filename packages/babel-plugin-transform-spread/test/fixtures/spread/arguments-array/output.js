function foo() {
  var _args;

  return bar(((_args = []).push.apply(_args, arguments), _args));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
