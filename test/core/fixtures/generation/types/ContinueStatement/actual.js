for (var i in foo) {
  continue;
}

foo: for (var i in foo) {
  continue foo;
}
