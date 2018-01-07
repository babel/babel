for (var i in foo) {
  break;
}

foo: for (var i in foo) {
  break foo;
}