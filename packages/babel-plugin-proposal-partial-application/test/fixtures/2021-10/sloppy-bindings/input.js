function shadowedArguments() {
  var arguments = 1;
  return f~(arguments);
}

try {
  throw 1;
} catch (e) {
  var g = f~(e);
  var e = 2;
}
