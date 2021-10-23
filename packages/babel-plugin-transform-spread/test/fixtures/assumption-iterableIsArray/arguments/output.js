function foo() {
  var _args;

  // We know for sure that 'arguments' is _not_ an array, so we
  // can ignore the assumption in this case.
  return (_args = []).push.apply(_args, arguments), _args;
}
