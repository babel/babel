function shadowedArguments() {
  var arguments = 1;
  return ((_f, _arguments) => function () {
    return _f(_arguments);
  })(f, arguments);
}
try {
  throw 1;
} catch (e) {
  var g = ((_f2, _e) => function () {
    return _f2(_e);
  })(f, e);
  var e = 2;
}
